import { Field, Formik, Form } from 'formik';
import { fetchMoviesByQuery } from '../../api';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { ThreeDots } from 'react-loader-spinner';

const initialValues = {
    query: '',
};

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [loaderIsActive, setLoaderIsActive] = useState(false);
    const [isSearched, setIsSearched] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(searchParams).get('query');
        if (query) {
            getMovies(query);
        }
    }, []);

    async function getMovies(query) {
        try {
            setLoaderIsActive(true);
            const data = (await fetchMoviesByQuery(query)).results;
            setMovies(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoaderIsActive(false);
            setIsSearched(true);
        }
    }

    function handleSubmit(value, action) {
        const { query } = value;

        const updatedSearchParams = new URLSearchParams(searchParams);
        updatedSearchParams.set('query', query);
        setSearchParams(updatedSearchParams);

        getMovies(query);
        action.resetForm();
    }
    return (
        <section>
            <div className="formContainer">
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    <Form>
                        <Field name="query" type="text" />
                        <button type="submit">Search</button>
                    </Form>
                </Formik>
            </div>
            {isSearched && (
                <div className="responseContainer">
                    {movies.length > 0 ? (
                        <MovieList movies={movies} location={location} />
                    ) : (
                        <p>
                            Sorry, no movies were found. Please try something
                            else!
                        </p>
                    )}
                </div>
            )}
            {loaderIsActive && (
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
        </section>
    );
}
