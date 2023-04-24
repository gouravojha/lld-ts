"use strict";
class CreateMovie {
    constructor(id, title, description, duration, imageUrl, genre) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.duration = duration;
        this.imageUrl = imageUrl;
        this.genre = genre;
    }
    create() {
        return {
            "id": this.id,
            "title": this.title,
            "description": this.description,
            "duration": this.duration,
            "imageUrl": this.imageUrl,
            "genre": this.genre
        };
    }
}
class BaseClass {
}
class MovieTicketBookingSystem extends BaseClass {
    constructor() {
        super();
        this.movies = [];
        this.theaters = [];
        this.showtimes = [];
        this.bookings = [];
    }
    addMovie(movie) {
        this.movies.push(movie);
    }
    addTheater(theater) {
        this.theaters.push(theater);
    }
    addShowtime(showtime) {
        this.showtimes.push(showtime);
    }
    getMovies() {
        return this.movies;
    }
    getTheaters() {
        return this.theaters;
    }
    getShowtimes(movieId, theaterId, date) {
        let arr = [];
        for (let obj of this.showtimes) {
            if (obj.movieId === movieId && obj.theaterId === theaterId && obj.startTime >= date) {
                arr.push(obj);
            }
        }
        return arr;
    }
    bookTicket(userId, showtimeId, seatNumber) {
        const showtime = this.showtimes.find(s => s.id === showtimeId);
        if (!showtime) {
            throw new Error("Showtime not found");
        }
        if (showtime.availableSeats <= 0) {
            throw new Error("No available seats");
        }
        const booking = {
            id: this.bookings.length + 1,
            userId: userId,
            showtimeId: showtimeId,
            seatNumber: seatNumber,
        };
        this.bookings.push(booking);
        showtime.availableSeats--;
        return booking;
    }
    getBookings() {
        return this.bookings;
    }
    getBookingsForUser(userId) {
        return this.bookings.filter(b => b.userId === userId);
    }
    getBookingsForShowtime(showtimeId) {
        return this.bookings.filter(b => b.showtimeId === showtimeId);
    }
}
