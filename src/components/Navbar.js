import LogoImg from '../assets/logo.png'
import { UserCircleIcon } from '@heroicons/react/24/solid'

export function Navbar() {
    return (
        <div className='flex justify-between items-center'>
            <img src={LogoImg} alt="CareGuide" style={{ width: 256 }} />
            <div className='mx-6 flex items-center text-gray-500'>
                <UserCircleIcon className='h-8' />
                <span>John</span>
            </div>
        </div>
    )
}