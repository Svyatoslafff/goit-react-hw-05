import { NavLink } from 'react-router';
import css from './Navigations.module.scss';
import clsx from 'clsx';

function buildLinkClass({ isActive }) {
    return clsx(css.link, isActive && css.active);
}

export default function Header() {
    return (
        <header className={css.header}>
            <nav className={css.navContainer}>
                <ul className={css.navList}>
                    <li className={css.listItem}>
                        <NavLink to="/" className={buildLinkClass}>
                            Home
                        </NavLink>
                    </li>
                    <li className={css.listItem}>
                        <NavLink to="/movies" className={buildLinkClass}>
                            Movies
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
