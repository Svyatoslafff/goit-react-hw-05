// import css from './HomePage.module.scss'
import { fetchTrendingMovies } from '/src/api.js';
import { ThreeDots } from 'react-loader-spinner';

// import MovieDetailsPage from '../MovieDetailsPage/MovieDetailsPage';

import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function HomePage() {
    const [trendings, setTrendings] = useState([]);
    const location = useLocation();
    console.log(location);

    useEffect(() => {
        async function getTrendings() {
            try {
                const newTrandings = await fetchTrendingMovies();
                console.log(newTrandings);

                setTrendings(newTrandings.results);
            } catch (error) {
                console.log(error);
            } finally {
                console.log('finnaly');
            }
        }
        getTrendings();
    }, []);
    return (
        <section>
            <h1>Trending today</h1>
            {!(trendings.length > 0) && (
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
            <ul>
                {trendings.map(({ id, title, overview }) => {
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
        </section>
    );
}
