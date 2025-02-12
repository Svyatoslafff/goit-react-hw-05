import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const options = {
    headers: {
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTQ2YTFlM2YwMDgzN2U0MTRhYWRmYzk3YTkzNDU5YiIsIm5iZiI6MTczODkyMjA2MS4wMzMsInN1YiI6IjY3YTVkODRkNDM3ODFiNGJmYTJmZmMyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UlMOY3uDIjNDjrqpGm2E9b22hepJn3P3Jx0rltnVoDk',
        accept: 'application / json',
    },
};

export async function fetchTrendingMovies() {
    return (await axios.get('/trending/movie/day?language=en-US', options))
        .data;
}

export async function fetchMoviesByQuery(query) {
    return (
        await axios.get(
            `/search/movie?include_adult=true&language=en-US&page=1&query=${query.toLowerCase()}`,
            options
        )
    ).data;
}

export async function fetchMovieById(id) {
    return (await axios.get(`/movie/${id}?language=en-US'`, options)).data;
}

export async function fetchMovieCreditsById(id) {
    return (await axios.get(`/movie/${id}/credits?language=en-US`, options))
        .data;
}

export async function fetchMovieReviewsById(id) {
    return (
        await axios.get(`/movie/${id}/reviews?language=en-US&page=1`, options)
    ).data;
}
