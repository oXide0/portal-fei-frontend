import { UserCircleIcon } from '@heroicons/react/24/solid';
import tukeLogoImg from '../assets/tuke-logo.png';
import tukeImg from '../assets/tuke.png';

const Header = () => {
    return (
        <div
            className='flex justify-between items-center px-8 py-3.5 max-sm:px-2'
            style={{ background: '#22262e' }}
        >
            <img
                src={tukeImg}
                alt='TUKE'
                style={{ maxWidth: '307px' }}
                className='w-full h-auto hidden sm:inline'
            />
            <img src={tukeLogoImg} alt='TUKE' style={{ maxWidth: '40px' }} className='sm:hidden' />
            <UserCircleIcon className='text-white max-w-10' />
        </div>
    );
};

export default Header;
