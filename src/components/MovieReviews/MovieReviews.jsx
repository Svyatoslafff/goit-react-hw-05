import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';

import { fetchMovieReviewsById } from '../../api';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from './MovieReviews.module.scss';

export default function MovieReviews() {
    const { movieID } = useParams();
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        try {
            setIsLoading(true);

            async function getReviews() {
                const data = (await fetchMovieReviewsById(movieID)).results;

                setReviews(data);
            }

            getReviews();
        } catch (error) {
            setError(error.status);
        } finally {
            setIsLoading(false);
        }
    }, [movieID]);

    return (
        <>
            {!error ? (
                <>
                    {reviews.length !== 0 ? (
                        <ul className={css.reviewsList}>
                            {reviews.map(
                                ({
                                    author_details: { username, avatar_path },
                                    content,
                                    created_at,
                                    id,
                                }) => {
                                    created_at = created_at
                                        .split('.')[0]
                                        .split('T')
                                        .join(' ');
                                    return (
                                        <li className={css.listItem} key={id}>
                                            <div className={css.userInfo}>
                                                <img
                                                    src={
                                                        avatar_path
                                                            ? `https://image.tmdb.org/t/p/w200${
                                                                  avatar_path
                                                              }`
                                                            : '/src/img/NoImage.jpg'
                                                    }
                                                    alt="user avatar"
                                                    width="200"
                                                />
                                                <h3>{username}</h3>
                                                <span
                                                    className={css.postedTime}
                                                >
                                                    {created_at}
                                                </span>
                                            </div>
                                            <p>{content}</p>
                                        </li>
                                    );
                                }
                            )}
                        </ul>
                    ) : (
                        <p className={css.noReviewsText}>
                            There`re no reviews to this movie
                        </p>
                    )}
                </>
            ) : (
                <ErrorMessage error={error} />
            )}
            {isLoading && (
                <div className="loaderContainer">
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
                </div>
            )}
        </>
    );
}
