import { Link, useLocation } from 'react-router-dom';

export default function MovieList({ movies }) {
    const location = useLocation();

    return (
        <ul>
            {movies.map(({ id, title, overview }) => {
                return (
                    <li key={id}>
                        <Link to={`/movies/${id}`} state={location}>
                            <h3>{title}</h3>
                        </Link>
                        <p>{overview}</p>
                    </li>
                );
            })}
        </ul>
    );
}
