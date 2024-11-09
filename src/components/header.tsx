import { useKeycloak } from '@react-keycloak/web';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tukeImg from '../assets/tuke.png';
import tukeLogoImg from '../assets/tuke-logo.png';
import { CircleUserRound } from 'lucide-react';

const Header = () => {
    const navigate = useNavigate();
    const { keycloak } = useKeycloak();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="flex justify-between items-center px-8 py-3.5 max-sm:px-2" style={{ background: '#22262e' }}>
            <button onClick={() => navigate('/')}>
                <img
                    src={tukeImg}
                    alt="TUKE"
                    style={{ maxWidth: '307px' }}
                    className="w-full h-auto hidden sm:inline"
                />
                <img src={tukeLogoImg} alt="TUKE" style={{ maxWidth: '40px' }} className="sm:hidden" />
            </button>
            <div className="relative">
                <CircleUserRound
                    size="35px"
                    className="text-white cursor-pointer"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                />
                {dropdownOpen && (
                    <div
                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
                        style={{ minWidth: '150px' }}
                    >
                        <button
                            onClick={async () => keycloak.logout()}
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left rounded-md"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export { Header };