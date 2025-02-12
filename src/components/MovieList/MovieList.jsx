import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.scss';

export default function MovieList({ movies }) {
    const location = useLocation();

    return (
        <ul className={css.moviesContainer}>
            {movies.map(({ id, title, overview }) => {
                return (
                    <li key={id}>
                        <Link
                            to={`/movies/${id}`}
                            state={location}
                            className={css.titleLink}
                        >
                            <h3 className={css.title}>{title}</h3>
                        </Link>
                        <p className={css.movieOverview}>{overview}</p>
                    </li>
                );
            })}
        </ul>
    );
}
