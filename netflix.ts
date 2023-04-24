// Users Module Interface

interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    paymentInfo: PaymentInfo;
    subscription: SubscriptionInfo;
}

interface Playlist {
    id: string;
    name: string;
    videos: Movies[] | TVShow[];
}

interface PaymentInfo {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    nameOnCard: string;
}

interface SubscriptionInfo {
    id: string;
    name: string;
    price: number;
    startDate: Date;
    endDate: Date;
}

interface Genre {
    id: string;
    name: string;
}

interface History {
    userId: string;
    movieId?: string;
    tvShowId?: string;
    lastWatched: Date;
    genre: Genre
}

// Netflix Core (Movies and TV Series) Module 

interface Movies {
    id: string;
    title: string;
    description: string;
    genre: Genre;
    duration: number;
    releaseDate: Date;
    actors: string[];
    directors: string[];
    rating: number;
    poster: string;
    trailer: string;
}

interface TVShow {
    id: string;
    title: string;
    description: string;
    genre: Genre;
    seasons: Season[];
    rating: number;
    poster: string;
    trailer: string;
}

interface Episode {
    id: string;
    title: string;
    description: string;
    duration: number;
    releaseDate: Date;
    rating: number;
    poster: string;
    video: string;
}

interface Season {
    id: string;
    title: string;
    description: string;
    episodes: Episode[];
}


class Netflix {
    private users: User[];
    private genres: Genre[];
    private movies: Movies[];
    private tvShows: TVShow[];
    private history: History[];
    private playlists: Playlist[];

    constructor() {
        this.users = [];
        this.genres = [];
        this.movies = [];
        this.tvShows = [];
        this.history = [];
        this.playlists = []
    }

    public registerUser(name: string, email: string, password: string, subscription: SubscriptionInfo, paymentInfo: PaymentInfo, phone: string): User {
        const user: User = {
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

    public login(email: string, password: string): User {
        const user = this.users.find((user) => user.email === email && user.password === password);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        return user;
    }

    public getUserById(userId: string): User {
        const user = this.users.find((user) => user.id === userId);
        if (!user) {
            throw new Error(`User with id ${userId} not found`);
        }
        return user;
    }

    public getUserByEmail(email: string): User {
        const user = this.users.find((user) => user.email === email);
        if (!user) {
            throw new Error(`User with email ${email} not found`);
        }
        return user;
    }

    public addGenre(genre: Genre): void {
        this.genres.push(genre);
    }

    public getGenres(): Genre[] {
        return this.genres;
    }

    public addMovie(movie: Movies): void {
        this.movies.push(movie);
    }

    public getMovies(): Movies[] {
        return this.movies;
    }

    public getVideoById(id: string): Movies {
        const video = this.movies.find((video) => video.id === id);
        if (!video) {
            throw new Error(`Video with ID ${id} not found`);
        }
        return video;
    }

    public getVideosByGenre(genre: string): Movies[] {
        return this.movies.filter((video) => video.genre.name === genre);
    }

    public getTopRatedVideos(): Movies[] {
        return this.movies.filter((video) => video.rating >= 8);
    }

    public addTVShow(tvShow: TVShow): void {
        this.tvShows.push(tvShow);
    }

    public getTVShows(): TVShow[] {
        return this.tvShows;
    }

    public getHistory(userId: string): History[] {
        return this.history.filter((h) => h.userId === userId);
    }

    public createPlaylist(name: string): Playlist {
        const playlist: Playlist = {
            id: Date.now().toString(),
            name,
            videos: [],
        };
        this.playlists.push(playlist);
        return playlist;
    }
}