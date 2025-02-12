import { Field, Formik, Form } from 'formik';
import { fetchMoviesByQuery } from '../../api';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { ThreeDots } from 'react-loader-spinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import toast from 'react-hot-toast';

const initialValues = {
    query: '',
};

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isSearched, setIsSearched] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const query = new URLSearchParams(searchParams).get('query');
        if (query) {
            getMovies(query);
        }
    }, []);

    async function getMovies(query) {
        try {
            setIsLoading(true);
            const data = (await fetchMoviesByQuery(query)).results;
            setMovies(data);
        } catch (error) {
            setError(error.status);
        } finally {
            setIsLoading(false);
            setIsSearched(true);
        }
    }

    function handleSubmit(value, action) {
        const { query } = value;
        if (!query) {
            toast.error('Please write something!');
            return;
        }
        const updatedSearchParams = new URLSearchParams(searchParams);
        updatedSearchParams.set('query', query);
        setSearchParams(updatedSearchParams);

        getMovies(query);
        action.resetForm();
    }
    return (
        <section>
            <div className="container">
                {!error ? (
                    <>
                        <div className="formContainer">
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                            >
                                <Form>
                                    <Field name="query" type="text" />
                                    <button type="submit">Search</button>
                                </Form>
                            </Formik>
                        </div>
                        {isSearched && (
                            <div className="responseContainer">
                                {movies.length > 0 ? (
                                    <MovieList movies={movies} />
                                ) : (
                                    <p>
                                        Sorry, no movies were found. Please try
                                        something else!
                                    </p>
                                )}
                            </div>
                        )}
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
