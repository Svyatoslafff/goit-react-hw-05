import { useEffect, useState } from 'react';
import { fetchMovieCreditsById } from '../../api';
import { useParams } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import css from './MovieCast.module.scss';

export default function MovieCast() {
    const { movieID } = useParams();
    const [isCast, setIsCast] = useState(true);
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
            let data = await fetchMovieCreditsById(movieID);
            if (data.cast.length > 0) {
                data = data.cast;
                setIsCast(true);
            } else {
                data = data.crew;
                // let crewData = [];
                // let crewData = data.reduce(
                //     (crewArray, crewMember, id, data) => {
                //         const filteredMember = data.filter(item => {
                //             return crewMember.name === item.name;
                //         });
                //         crewArray = [...crewArray, filteredMember];
                //     }
                // );
                // console.log(crewData);

                setIsCast(false);
            }
            console.log(data);

            sessionStorage.setItem('cast', JSON.stringify(data));
            setMovieCast(data);
        }
        if (movieCast.length === 0) {
            getMovieCast();
        }
    }, []);

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
            {movieCast.map(({ name, character, id, profile_path, job }) => {
                return (
                    <li key={id}>
                        <img
                            src={`https://image.tmdb.org/t/p/w200${
                                profile_path
                            }`}
                            alt="actor's photo"
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
            })}
        </ul>
    );
}
