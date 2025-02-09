import { Route, Routes } from 'react-router';
import './App.module.scss';
import Header from '../Header/Header';
import HomePage from '../../pages/HomePage/HomePage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import MoviesPage from '../../pages/MoviesPage/MoviesPage';
import MovieCast from '../MovieCast/MovieCast';
import MovieReviews from '../MovieReviews/MovieReviews';
import MovieDetailsPage from '../../pages/MovieDetailsPage/MovieDetailsPage';

export default function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movies" element={<MoviesPage />} />
                <Route path="/movies/:movieID" element={<MovieDetailsPage />}>
                    <Route path="cast" element={<MovieCast />} />
                    <Route path="reviews" element={<MovieReviews />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
}
