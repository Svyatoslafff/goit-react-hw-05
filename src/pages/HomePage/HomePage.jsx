import css from './HomePage.module.scss';
import { fetchTrendingMovies } from '/src/api.js';
import { ThreeDots } from 'react-loader-spinner';
import { useEffect, useState } from 'react';

import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import MovieList from '../../components/MovieList/MovieList';

export default function HomePage() {
    const [trendings, setTrendings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getTrendings() {
            try {
                setIsLoading(true);
                const newTrandings = await fetchTrendingMovies();
                setTrendings(newTrandings.results);
            } catch (error) {
                setError(error.status);
            } finally {
                setIsLoading(false);
            }
        }
        getTrendings();
    }, []);
    return (
        <section>
            <div className="container">
                {!error ? (
                    <>
                        <h1 className={css.title}>Trendings today</h1>
                        <MovieList movies={trendings} />
                    </>
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
            </div>
        </section>
    );
}
