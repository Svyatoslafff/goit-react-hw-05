import { useEffect, useState } from 'react';
import { fetchMovieCreditsById } from '../../api';
import { useParams } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import css from './MovieCast.module.scss';

export default function MovieCast() {
    const { movieID } = useParams();
    const [movieCast, setMovieCast] = useState(() => {
        const data = JSON.parse(sessionStorage.getItem('cast'));
        const id = JSON.parse(sessionStorage.getItem('movieId'));

        if (data && id === movieID) {
            return data;
        } else {
            return [];
        }
    });

    useEffect(() => {
        sessionStorage.setItem('movieId', JSON.stringify(movieID));

        async function getMovieCast() {
            const data = (await fetchMovieCreditsById(movieID)).cast;
            console.log(data);

            sessionStorage.setItem('cast', JSON.stringify(data));
            setMovieCast(data);
        }
        if (movieCast.length === 0) {
            getMovieCast();
        }
    }, []);

    console.log(movieCast);

    if (movieCast.length === 0) {
        return (
            <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        );
    }
    return (
        <ul className={css.castList}>
            {movieCast.map(({ name, character, id, profile_path }) => {
                return (
                    <li key={id}>
                        <img
                            src={`https://image.tmdb.org/t/p/w200${
                                profile_path
                            }`}
                            alt=""
                        />
                        <div className="info">
                            <h3>{name}</h3>
                            <p>Character: {character}</p>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
