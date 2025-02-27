import { Route, Routes } from 'react-router';
import { lazy, Suspense } from 'react';
import './App.module.scss';

import Navigation from '../Navigation/Navigation';
import { ThreeDots } from 'react-loader-spinner';
const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const NotFoundPage = lazy(
    () => import('../../pages/NotFoundPage/NotFoundPage')
);
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews'));
const MovieDetailsPage = lazy(
    () => import('../../pages/MovieDetailsPage/MovieDetailsPage')
);

export default function App() {
    return (
        <>
            <Navigation />
            <Suspense
                fallback={
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
                }
            >
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/movies" element={<MoviesPage />} />
                    <Route
                        path="/movies/:movieId"
                        element={<MovieDetailsPage />}
                    >
                        <Route path="cast" element={<MovieCast />} />
                        <Route path="reviews" element={<MovieReviews />} />
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
        </>
    );
}
