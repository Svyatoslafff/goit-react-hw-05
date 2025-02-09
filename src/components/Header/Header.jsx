import { NavLink } from 'react-router';
import css from './Header.module.scss';

export default function Header() {
    return (
        <header className={css.header}>
            <nav className={css.navContainer}>
                <ul className={css.navList}>
                    <li className={css.listItem}>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li className={css.listItem}>
                        <NavLink to="/movies">Movies</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
