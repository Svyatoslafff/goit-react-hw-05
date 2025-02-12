import { useEffect, useState } from 'react';
import { fetchMovieCreditsById } from '../../api';
import { useParams } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import css from './MovieCast.module.scss';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function MovieCast() {
    const { movieID } = useParams();
    const [isCast, setIsCast] = useState(true);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [movieCast, setMovieCast] = useState([]);

    useEffect(() => {
        async function getMovieCast() {
            try {
                setIsLoading(true);

                let data = await fetchMovieCreditsById(movieID);
                if (data.cast.length > 0) {
                    data = data.cast;

                    setIsCast(true);
                } else {
                    data = data.crew;
                    setIsCast(false);
                }
                setMovieCast(data);
            } catch (error) {
                setError(error.status);
            } finally {
                setIsLoading(false);
            }
        }
        if (movieCast.length === 0) {
            getMovieCast();
        }
    }, []);

    return (
        <>
            {!error ? (
                <ul className={css.castList}>
                    {movieCast.map(
                        ({ name, character, id, profile_path, job }) => {
                            return (
                                <li key={id}>
                                    <img
                                        src={
                                            profile_path
                                                ? `https://image.tmdb.org/t/p/w200${
                                                      profile_path
                                                  }`
                                                : '/src/img/NoImage.jpg'
                                        }
                                        alt="user avatar"
                                        width="200"
                                    />

                                    <div className="info">
                                        <h3>{name}</h3>
                                        {isCast ? (
                                            <p>Character: {character}</p>
                                        ) : (
                                            <p>Job: {job}</p>
                                        )}
                                    </div>
                                </li>
                            );
                        }
                    )}
                </ul>
            ) : (
                <ErrorMessage error={error} />
            )}
            {isLoading && (
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
            )}
        </>
    );
}
