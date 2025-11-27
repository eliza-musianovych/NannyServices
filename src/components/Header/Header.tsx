import css from './Header.module.css';

import clsx from 'clsx';
import { 
    Link, 
    NavLink,
    useLocation
} from 'react-router-dom';
import { FaUser } from "react-icons/fa6";
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { logoutUser } from '../../services/authService';

type HeaderProps = {
    onLoginClick: () => void;
    onRegisterClick: () => void;
    isHome: boolean;
};

export default function Header({ onLoginClick, onRegisterClick, isHome }: HeaderProps) {
    const { user } = useAuth();
    const { cycleTheme } = useTheme();
    const location = useLocation();

    const routes = [
        {link: '/', text: 'Home'},
        {link: '/nannies', text: 'Nannies'},
        {link: '/favorites', text: 'Favorites'},
    ];

    const filteredRoutes = routes.filter(route => {
        if (route.text === "Favorites" && !user) return false;
        return true;
    });

    const authbtn = [
        {onClick: onLoginClick, text: 'Log In'},
        {onClick: onRegisterClick, text: 'Registration'},
    ];

    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (location.pathname === '/') {
            cycleTheme();
        } else {
            window.location.href = '/';
        }
    };

    return(
        <header className={clsx(css.header, isHome && css.homeHeader)}>
            <Link 
            className={clsx(css.logo, isHome && css.homeLogo)}
            to='/'
            onClick={handleLogoClick}
            >
                Nanny.Services
            </Link>

            <nav>
                <ul className={css.navigation}>
                    {filteredRoutes.map(({ link, text }) => (
                        <li 
                        className={css.navigationItem}
                        key={link}
                        >
                            <NavLink
                            to={link}
                            end={link === '/'}
                            >
                                {text}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {!user ? 
            <ul className={css.authBtnList}>
                {authbtn.map(({ text, onClick }) => (
                    <button
                    className={clsx(css.authBtnItem, text === 'Registration' && css.register)} 
                    key={text} 
                    onClick={onClick}
                    type='button'
                    >
                        {text}
                    </button>
                ))}
            </ul> :
            <div className={css.authList}>
                <div className={css.user}>
                    <div className={css.icon}>
                        <FaUser className={css.userIcon} />
                    </div>
                    <p className={css.userName}>{user.displayName}</p>
                </div>
                <button 
                className={css.logoutBtn}
                onClick={logoutUser}
                >
                    Log out
                </button>
            </div>
            }
        </header>
    );
};