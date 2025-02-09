import { useEffect, useState } from 'react';
import { fetchMovieReviewsById } from '../../api';
import { ThreeDots } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';

export default function MovieReviews() {
    const { movieID } = useParams();
    const [reviews, setReviews] = useState(() => {
        const data = JSON.parse(sessionStorage.getItem('reviews'));
        const id = JSON.parse(sessionStorage.getItem('movieId'));

        if (data && id === movieID) {
            return data;
        } else {
            return null;
        }
    });
    const [loaderIsActive, setLoaderIsActive] = useState(false);

    useEffect(() => {
        try {
            setLoaderIsActive(true);

            async function getReviews() {
                const data = (await fetchMovieReviewsById(movieID)).results;

                sessionStorage.setItem('reviews', JSON.stringify(data));
                setReviews(data);
            }

            if (!reviews) {
                getReviews();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoaderIsActive(false);
        }
    }, []);

    if (loaderIsActive || !reviews) {
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
        <>
            {!(reviews.length === 0) ? (
                <ul>
                    {reviews.map(
                        ({
                            author_details: { username, avatar_path },
                            content,
                            created_at,
                            id,
                        }) => {
                            return (
                                <li key={id}>
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
                                    <span>{created_at}</span>
                                    <p>{content}</p>
                                </li>
                            );
                        }
                    )}
                </ul>
            ) : (
                <p>There`re no reviews to this movie</p>
            )}
        </>
    );
}
