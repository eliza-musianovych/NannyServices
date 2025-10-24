import css from './Header.module.css';

import clsx from 'clsx';
import { 
    Link, 
    NavLink,
    useLocation
} from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

type HeaderProps = {
    onLoginClick: () => void;
    onRegisterClick: () => void;
    isHome: boolean;
};

export default function Header({ onLoginClick, onRegisterClick, isHome }: HeaderProps) {
    const { cycleTheme } = useTheme();
    const location = useLocation();

    const routes = [
        {link: '/', text: 'Home'},
        {link: '/nannies', text: 'Nannies'},
        {link: 'favorites', text: 'Favorites'},
    ];

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
                    {routes.map(({ link, text }) => (
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
            </ul>
        </header>
    );
};