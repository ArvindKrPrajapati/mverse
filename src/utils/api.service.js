import { token } from "../utils/constants";
import { url } from "../utils/constants";

const common = () => {
    return {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
}

export const _search = async (text) => {
    try {
        const res = await fetch(url + "/search/movie?query=" + text, common())
        return res.json()
    } catch (error) {
        return error
    }
}

export const _searchTv = async (text) => {
    try {
        const res = await fetch(url + "/search/tv?query=" + text, common())
        return res.json()
    } catch (error) {
        return error
    }
}

export const _getMovieDetails = async (id) => {
    try {
        const res = await fetch(url + "/movie/" + id, common())
        return res.json()
    } catch (error) {
        return error
    }
}

export const _getTvDetails = async (id) => {
    try {
        const res = await fetch(url + "/tv/" + id, common())
        return res.json()
    } catch (error) {
        return error
    }
}

export const _getPopular = async (page) => {
    try {
        const res = await fetch(url + "/movie/popular?page=" + page, common())
        return res.json()
    } catch (error) {
        return error
    }
}

export const _getTopRated = async (page) => {
    try {
        const res = await fetch(url + "/movie/top_rated?page=" + page, common())
        return res.json()
    } catch (error) {
        return error
    }
}

export const _getPopularTv = async (page) => {
    try {
        const res = await fetch(url + "/tv/popular?page=" + page, common())
        return res.json()
    } catch (error) {
        return error
    }
}

export const _getTopRatedTv = async (page) => {
    try {
        const res = await fetch(url + "/tv/top_rated?page=" + page, common())
        return res.json()
    } catch (error) {
        return error
    }
}

export const _getRecommendations = async (id, page) => {
    try {
        const res = await fetch(url + "/movie/" + id + "/recommendations?page=" + page, common())
        return res.json()
    } catch (error) {
        return error
    }
}

export const _getSimilar = async (id, page) => {
    try {
        const res = await fetch(url + "/movie/" + id + "/similar?page=" + page, common())
        return res.json()
    } catch (error) {
        return error
    }
}

export const _getRecommendationsTv = async (id, page) => {
    try {
        const res = await fetch(url + "/tv/" + id + "/recommendations?page=" + page, common())
        return res.json()
    } catch (error) {
        return error
    }
}

export const _getSimilarTv = async (id, page) => {
    try {
        const res = await fetch(url + "/tv/" + id + "/similar?page=" + page, common())
        return res.json()
    } catch (error) {
        return error
    }
}

export const _getHindiMovies = async (page) => {
    try {
        const d = new Date().toISOString().split("T")[0]
        const res = await fetch(url + "/discover/movie?with_original_language=hi&primary_release_date.lte=" + d + "&sort_by=release_date.desc&vote_average.gte=7&page=" + page, common())
        return res.json()
    } catch (error) {
        return error
    }
}

export const _getHindiTv = async (page) => {
    try {
        const d = new Date().toISOString().split("T")[0]
        const res = await fetch(url + "/discover/tv?with_original_language=hi&primary_release_date.lte=" + d + "&sort_by=release_date.desc&vote_average.gte=7&page=" + page, common())
        return res.json()
    } catch (error) {
        return error
    }
}

export const _discoverMore = async (page) => {
    try {
        const res = await fetch(url + "/discover/movie?page=" + page, common())
        return res.json()
    } catch (error) {
        return error
    }
}

export const _discoverMoreTv = async (page) => {
    try {
        const res = await fetch(url + "/discover/tv?page=" + page, common())
        return res.json()
    } catch (error) {
        return error
    }
}

export const _getEpisodes = async (movieid, season) => {
    try {
        const res = await fetch(url + "/tv/" + movieid + "/season/" + season, common())
        return res.json()
    } catch (error) {
        return error
    }
}

export const _getTvImdb = async (movieid) => {
    try {
        const res = await fetch(url + "/tv/" + movieid + "/external_ids", common())
        return res.json()
    } catch (error) {
        return error
    }
}

