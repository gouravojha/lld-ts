"use strict";
// Users Module Interface
class Netflix {
    constructor() {
        this.users = [];
        this.genres = [];
        this.movies = [];
        this.tvShows = [];
        this.history = [];
        this.playlists = [];
    }
    registerUser(name, email, password, subscription, paymentInfo, phone) {
        const user = {
            id: Date.now().toString(),
            name,
            email,
            password,
            phone,
            subscription,
            paymentInfo
        };
        this.users.push(user);
        return user;
    }
    login(email, password) {
        const user = this.users.find((user) => user.email === email && user.password === password);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        return user;
    }
    getUserById(userId) {
        const user = this.users.find((user) => user.id === userId);
        if (!user) {
            throw new Error(`User with id ${userId} not found`);
        }
        return user;
    }
    getUserByEmail(email) {
        const user = this.users.find((user) => user.email === email);
        if (!user) {
            throw new Error(`User with email ${email} not found`);
        }
        return user;
    }
    addGenre(genre) {
        this.genres.push(genre);
    }
    getGenres() {
        return this.genres;
    }
    addMovie(movie) {
        this.movies.push(movie);
    }
    getMovies() {
        return this.movies;
    }
    getVideoById(id) {
        const video = this.movies.find((video) => video.id === id);
        if (!video) {
            throw new Error(`Video with ID ${id} not found`);
        }
        return video;
    }
    getVideosByGenre(genre) {
        return this.movies.filter((video) => video.genre.name === genre);
    }
    getTopRatedVideos() {
        return this.movies.filter((video) => video.rating >= 8);
    }
    addTVShow(tvShow) {
        this.tvShows.push(tvShow);
    }
    getTVShows() {
        return this.tvShows;
    }
    getHistory(userId) {
        return this.history.filter((h) => h.userId === userId);
    }
    createPlaylist(name) {
        const playlist = {
            id: Date.now().toString(),
            name,
            videos: [],
        };
        this.playlists.push(playlist);
        return playlist;
    }
}
