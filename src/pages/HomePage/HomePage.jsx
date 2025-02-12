// import css from './HomePage.module.scss'
import { fetchTrendingMovies } from '/src/api.js';
import { ThreeDots } from 'react-loader-spinner';

import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';

export default function HomePage() {
    const [trendings, setTrendings] = useState([]);

    useEffect(() => {
        async function getTrendings() {
            try {
                const newTrandings = await fetchTrendingMovies();

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
            <MovieList movies={trendings} />
        </section>
    );
}
