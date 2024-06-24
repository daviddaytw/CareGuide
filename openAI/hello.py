import os
from pathlib import Path
from flask import Flask, request, jsonify,send_file,render_template
from openai import OpenAI
from flask_cors import CORS
import string
import random
from BedrockAgent import BedrockAgent



app = Flask(__name__, static_url_path='',
                  static_folder='build',
                  template_folder='build')
app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
CORS(app) 
client = OpenAI()
agent = BedrockAgent()

@app.route("/")
def hello():
    return render_template("index.html")

#user type text and get string reply from AI
@app.route('/uploadText', methods=['POST'])
def upload_text():
    data = request.json
    if not data or 'content' not in data:
        return jsonify({"error": "No content provided"}), 400
    
    content = data['content']
    #get reply from ai
    responseStringData=agent.invoke(content)
    
    speech_file_path = Path(app.config['UPLOAD_FOLDER']) / "aiReply.mp3"
    responseAudioData = client.audio.speech.create(
                model="tts-1",
                voice="alloy",
                input=responseStringData,
                speed=1.2
                )
    responseAudioData.stream_to_file(speech_file_path)

    # file_url = request.host_url + 'uploads/speech.mp3'
                    
    return jsonify({"replyStringFromAI":responseStringData})

# get audio version of AI reply
@app.route('/get_audio', methods=['GET'])
def get_audio():
    audio_file_path = Path(__file__).parent / 'uploads' / 'aiReply.mp3'
    
    if not audio_file_path.exists():
        return 'File not found', 404

    return send_file(audio_file_path, mimetype='audio/mpeg')


@app.route('/uploadFile', methods=['POST'])
#to upload medical recording file or user voice input
def upload_file():
    print(request)
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if file and file.filename.endswith('.mp3'):
        # Save the uploaded file temporarily
        temp_path = os.path.join('/tmp', file.filename)
        file.save(temp_path)
        
        # Transcribe the MP3 file using OpenAI Whisper
        with open(temp_path, 'rb') as audio_file:
            transcription = client.audio.transcriptions.create(
                model="whisper-1", 
                file=audio_file
            )
        # responseStringData=agent.invoke(transcription.text)

        
        # speech_file_path = Path(app.config['UPLOAD_FOLDER']) / "aiReply.mp3"

        # responseAudioData = client.audio.speech.create(
        #         model="tts-1",
        #         voice="alloy",
        #         input=responseStringData,
        #         speed=1.2
        #         )
        # responseAudioData.stream_to_file(speech_file_path)
    
        # Clean up the temporary file
        os.remove(temp_path)
        
        return jsonify({"transcription": transcription.text})
    else:
        return jsonify({"error": "Invalid file type. Please upload an MP3 file."}), 400
