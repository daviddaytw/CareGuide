# CareGuide
[Go to the app](https://careguide.onrender.com/)



## Web UI

### Getting Started
#### `npm install --legacy-peer-deps`

Install the dependencies.

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Backend

### Create an environment

```bash
python3 -m venv myvenv
```

### Activate the environment
```bash
source myvenv/bin/activate
```

### Install Flask

```bash
pip install -r requirement.txt
```

### Run the backend server

```bash
flask --app hello run --host=0.0.0.0 --debug --port=5003
```

### Set OpenAI api key and set AWS service
create `.env` file with the content below 
`AWS_ACCESS_KEY_ID=your key id
AWS_SECRET_ACCESS_KEY=ur secret access key`

and follow the [OpenAI api key](https://platform.openai.com/docs/quickstart#:~:text=First%2C%20create%20an%20OpenAI%20account,not%20share%20it%20with%20anyone) to set up Open api key in terminal

