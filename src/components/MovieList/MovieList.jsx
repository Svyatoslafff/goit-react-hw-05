import { Link } from 'react-router-dom';

export default function MovieList({ movies, location }) {
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
