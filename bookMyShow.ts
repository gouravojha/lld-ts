interface User {
    name: string;
    email: string;
    phone: string;
    paymentInfo: PaymentInfo;
}

interface PaymentInfo {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    nameOnCard: string;
}

interface Movie {
    id: number;
    title: string;
    description: string;
    duration: number;
    imageUrl: string;
    genre: string[];
}

interface Theater {
    id: number;
    name: string;
    location: string;
    capacity: number;
}

interface ShowTime {
    id: number;
    movieId: number;
    theaterId: number;
    startTime: Date;
    endTime: Date;
    price: number;
    availableSeats: number;
}

interface Booking {
    id: number;
    userId: number;
    showtimeId: number;
    seatNumber: string
}

class CreateMovie implements Movie {
    id: number;
    title: string;
    description: string;
    duration: number;
    imageUrl: string;
    genre: string[];

    constructor(id: number, title: string, description: string, duration: number, imageUrl: string, genre: string[]) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.duration = duration;
        this.imageUrl = imageUrl;
        this.genre = genre
    }

    create(): {} {
        return {
            "id": this.id,
            "title": this.title,
            "description": this.description,
            "duration": this.duration,
            "imageUrl": this.imageUrl,
            "genre": this.genre
        }
    }

}

abstract class BaseClass {
    abstract bookTicket(userId: number, showtimeId: number, seatNumber: string): Booking
}

class MovieTicketBookingSystem extends BaseClass {
    private movies: Movie[];
    private theaters: Theater[];
    private showtimes: ShowTime[];
    private bookings: Booking[];

    constructor() {
        super()
        this.movies = [];
        this.theaters = [];
        this.showtimes = [];
        this.bookings = [];
    }

    addMovie(movie: Movie): void {
        this.movies.push(movie);
    }

    addTheater(theater: Theater): void {
        this.theaters.push(theater);
    }

    addShowtime(showtime: ShowTime): void {
        this.showtimes.push(showtime);
    }

    getMovies(): Movie[] {
        return this.movies;
    }

    getTheaters(): Theater[] {
        return this.theaters;
    }

    getShowtimes(movieId: number, theaterId: number, date: Date): ShowTime[] {
        let arr: ShowTime[] = []
        for (let obj of this.showtimes) {
            if (obj.movieId === movieId && obj.theaterId === theaterId && obj.startTime >= date) {
                arr.push(obj)
            }
        }

        return arr
    }

    bookTicket(userId: number, showtimeId: number, seatNumber: string): Booking {
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

    getBookings(): Booking[] {
        return this.bookings;
    }

    getBookingsForUser(userId: number): Booking[] {
        return this.bookings.filter(b => b.userId === userId);
    }

    getBookingsForShowtime(showtimeId: number): Booking[] {
        return this.bookings.filter(b => b.showtimeId === showtimeId);
    }
}