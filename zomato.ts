// User interface to store user details
interface ZomatoUser {
    id: string;
    name: string;
    email: string;
    password: string;
    address: Address;
    orders: Order[];
}

// Address interface to store address details
interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

// Order interface to store order details
interface Order {
    id: string;
    restaurant: Restaurant;
    items: OrderItem[];
    total: number;
    zomatostatus: ZomatoOrderStatus;
    deliveryAddress: Address;
    deliveryTime: Date;
}

// OrderItem interface to store order item details
interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

// ZomatoOrderStatus enum to store order status options
enum ZomatoOrderStatus {
    Pending = 'Pending',
    Confirmed = 'Confirmed',
    InProgress = 'In Progress',
    OutForDelivery = 'Out for Delivery',
    Delivered = 'Delivered',
    Cancelled = 'Cancelled',
}

// Restaurant interface to store restaurant details
interface Restaurant {
    id: string;
    name: string;
    address: Address;
    menu: MenuItem[];
}

// MenuItem interface to store menu item details
interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
}

// FoodDelivery class to implement the food delivery system functionality
class Zomato {
    private users: ZomatoUser[];
    private restaurants: Restaurant[];
    private orders: Order[];

    constructor() {
        this.users = [];
        this.restaurants = [];
        this.orders = [];
    }

    // User Management functions

    public registerUser(name: string, email: string, password: string, address: Address): ZomatoUser {
        const user: ZomatoUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
            address,
            orders: [],
        };
        this.users.push(user);
        return user;
    }

    public login(email: string, password: string): ZomatoUser {
        const user = this.users.find((user) => user.email === email && user.password === password);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        return user;
    }

    // Restaurant Management functions

    public addRestaurant(name: string, address: Address, menu: MenuItem[]): Restaurant {
        const restaurant: Restaurant = {
            id: Date.now().toString(),
            name,
            address,
            menu,
        };
        this.restaurants.push(restaurant);
        return restaurant;
    }

    public getRestaurantById(id: string): Restaurant {
        const restaurant = this.restaurants.find((restaurant) => restaurant.id === id);
        if (!restaurant) {
            throw new Error(`Restaurant with ID ${id} not found`);
        }
        return restaurant;
    }

    public getRestaurantsByLocation(location: Address): Restaurant[] {
        return this.restaurants.filter((restaurant) => restaurant.address.city === location.city);
    }

    // Order Management functions

    public placeZomatoOrder(user: ZomatoUser, restaurantId: string, items: OrderItem[], deliveryAddress: Address, deliveryTime: Date): {} {
        const restaurant = this.getRestaurantById(restaurantId);
        const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const order: Order = {
            id: Date.now().toString(),
            restaurant,
            items,
            total,
            zomatostatus: ZomatoOrderStatus.Pending,
            deliveryAddress,
            deliveryTime,
            status: OrderStatus.Pending
        };
        user.orders.push(order)

        return {
            ...user,
            invoice : order
        }
    }
}
