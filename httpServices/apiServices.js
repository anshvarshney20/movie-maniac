import axios from "axios";
import { api_key } from "./auths";

const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingEndpint = `${apiBaseUrl}/trending/movie/day?api_key=${api_key}`;
const upcomingEndpint = `${apiBaseUrl}/movie/upcoming?api_key=${api_key}`;
const topRatedEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${api_key}`;
const searchMovieEndpoint = 
  `${apiBaseUrl}/search/movie?api_key=${api_key}`;
const trending_character = `${apiBaseUrl}/trending/person/day?api_key=${api_key}`
// const latestMovieEndpoint = `${apiBaseUrl}/tv/latest?api_key=${api_key}`;

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/342${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

const movieDetailEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}?api_key=${api_key}`;
const movieCreditEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${api_key}`;
const similarMovieEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${api_key}`;
const personDetailEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}?api_key=${api_key}`;
const personMovieEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${api_key}`;
const apiCalls = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error.message);
    return {};
  }
};

export const fetchTrendingMovies = () => {
  return apiCalls(trendingEndpint);
};
export const fetchUpcomingMovies = () => {
  return apiCalls(upcomingEndpint);
};
export const fetchtopRatedMovies = () => {
  return apiCalls(topRatedEndpoint);
};

export const trendingCharacters = () => {
  return apiCalls(trending_character);
};

export const fetchMovieDetail = (id) => {
  return apiCalls(movieDetailEndpoint(id));
};

export const fetchMovieCredit = (id) => {
  return apiCalls(movieCreditEndpoint(id));
};
export const fetchPersonDetail = (id) => {
  return apiCalls(personDetailEndpoint(id));
};
export const fetchPersonMovie = (id) => {
  return apiCalls(personMovieEndpoint(id));
};

export const searchMovie = params =>{
  return apiCalls(searchMovieEndpoint,params)
}
export const fallBackPoster =
  "https://imgs.search.brave.com/86dQ15ZDLtyzkLU0c6C76BeYYg_xfqR6MlIQWwXANGg/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFEYWo3/dnRRRG8vMS8wLzEx/MzF3L2NhbnZhLW1v/bm9jaHJvbWUtZmls/bS1zaWducy1wb3N0/ZXIteGsxYkYwS2NO/X2MuanBn";
export const fallBackPerson =
  "https://imgs.search.brave.com/aAodLHcWNwPw5XJqk7AL2R49AhLv9tT4CNpk40xPMfI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS8x/MjgvNzk4MC83OTgw/NTc0LnBuZw";
// export const fetchLatestMovie = ()=>{
//     return apiCalls(latestMovieEndpoint)
// }

export const fetchSimilarMovie = (id) => {
  return apiCalls(similarMovieEndpoint(id));
};
