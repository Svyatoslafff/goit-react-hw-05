import { useEffect, useRef, useState } from 'react';
import {
    Link,
    NavLink,
    Outlet,
    useLocation,
    useParams,
} from 'react-router-dom';
import { fetchMovieById } from '../../api';
import { ThreeDots } from 'react-loader-spinner';

import css from './MovieDetailsPage.module.scss';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import clsx from 'clsx';

export default function MovieDetailsPage() {
    const { movieID } = useParams();
    const location = useLocation();
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [movieDescription, setMovieDescription] = useState({});
    const [subLinksBackRoute, setSubLinksBackRoute] = useState({
        cast: location.pathname.includes('cast') ? true : false,
        reviews: location.pathname.includes('reviews') ? true : false,
    });

    const { current: goBack } = useRef(location?.state ?? '/movies');

    useEffect(() => {
        async function getMovieDeatails() {
            try {
                setIsLoading(true);
                const data = await fetchMovieById(movieID);
                setMovieDescription(data);
            } catch (error) {
                setError(error.status);
            } finally {
                setIsLoading(false);
            }
        }
        getMovieDeatails();
    }, [movieID]);

    function handleSubLinkClick(clickedLinkName, toOverwrite) {
        if (subLinksBackRoute[clickedLinkName]) {
            setSubLinksBackRoute({
                [clickedLinkName]: false,
                [toOverwrite]: false,
            });
        } else {
            setSubLinksBackRoute({
                [clickedLinkName]: true,
                [toOverwrite]: false,
            });
        }
    }

    function buildLinkClass({ isActive }) {
        return clsx(css.link, isActive && css.active);
    }

    // destructuring
    let {
        title,
        poster_path,
        overview,
        status,
        release_date,
        genres,
        production_countries,
        vote_average,
        vote_count,
    } = movieDescription;

    if (title) {
        release_date = release_date.slice(0, 4);
        genres = genres.map(item => item.name).join(', ');
        production_countries = production_countries
            .map(item => item.name)
            .join(', ');
    }

    return (
        <section>
            {!error ? (
                <>
                    {!isLoading ? (
                        <>
                            <div
                                className={`container ${css.movieDetailsContainer}`}
                            >
                                <Link to={goBack} className={css.goBackButton}>
                                    Go Back
                                </Link>
                                <div className={css.movieDescription}>
                                    {window.innerWidth <= 768 && (
                                        <div
                                            className={css.mobileTitleContainer}
                                        >
                                            <h2 className={css.movieTitle}>
                                                {title}
                                            </h2>
                                        </div>
                                    )}
                                    <div className={css.imageContainer}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w300${
                                                poster_path
                                            }`}
                                            alt={title + ' movie poster'}
                                        />
                                    </div>
                                    <div
                                        className={css.textDescriptionContainer}
                                    >
                                        {window.innerWidth > 768 && (
                                            <h2 className={css.movieTitle}>
                                                {title}
                                            </h2>
                                        )}
                                        <ul className={css.shortInfoList}>
                                            <li className={css.listItem}>
                                                <p>
                                                    <span
                                                        className={css.infoItem}
                                                    >
                                                        Release date:
                                                    </span>{' '}
                                                    {release_date}
                                                </p>
                                            </li>
                                            <li className={css.listItem}>
                                                <p>
                                                    <span
                                                        className={css.infoItem}
                                                    >
                                                        Status:
                                                    </span>{' '}
                                                    {status}
                                                </p>
                                            </li>
                                            <li className={css.listItem}>
                                                <p>
                                                    <span
                                                        className={css.infoItem}
                                                    >
                                                        Genres:
                                                    </span>{' '}
                                                    {genres}
                                                </p>
                                            </li>
                                            <li className={css.listItem}>
                                                <p>
                                                    <span
                                                        className={css.infoItem}
                                                    >
                                                        Countries:
                                                    </span>{' '}
                                                    {production_countries}
                                                </p>
                                            </li>
                                            <li className={css.listItem}>
                                                <p>
                                                    <span
                                                        className={css.infoItem}
                                                    >
                                                        Average rating:
                                                    </span>{' '}
                                                    {vote_average}
                                                </p>
                                            </li>
                                            <li className={css.listItem}>
                                                <p>
                                                    <span
                                                        className={css.infoItem}
                                                    >
                                                        Total votes:
                                                    </span>{' '}
                                                    {vote_count}
                                                </p>
                                            </li>
                                            <li className={css.listItem}>
                                                <p>
                                                    <span
                                                        className={css.infoItem}
                                                    >
                                                        Overview:
                                                    </span>{' '}
                                                    {overview}
                                                </p>
                                            </li>
                                        </ul>
                                        <p>
                                            {/* <p className={css.listItem}>Overview: {overview}</p> */}
                                        </p>
                                    </div>
                                </div>
                                <div className={css.additionalInfo}>
                                    <ul>
                                        <li>
                                            <NavLink
                                                to={
                                                    subLinksBackRoute.cast
                                                        ? `/movies/${movieID}`
                                                        : 'cast'
                                                }
                                                onClick={() =>
                                                    handleSubLinkClick(
                                                        'cast',
                                                        'reviews'
                                                    )
                                                }
                                                className={buildLinkClass}
                                            >
                                                Cast
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink
                                                to={
                                                    subLinksBackRoute.reviews
                                                        ? `/movies/${movieID}`
                                                        : 'reviews'
                                                }
                                                onClick={() =>
                                                    handleSubLinkClick(
                                                        'reviews',
                                                        'cast'
                                                    )
                                                }
                                                className={buildLinkClass}
                                            >
                                                Reviews
                                            </NavLink>
                                        </li>
                                    </ul>
                                    <div>
                                        <Outlet />
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
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
            ) : (
                <ErrorMessage error={error} />
            )}
        </section>
    );
}
