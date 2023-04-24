"use strict";
// ZomatoOrderStatus enum to store order status options
var ZomatoOrderStatus;
(function (ZomatoOrderStatus) {
    ZomatoOrderStatus["Pending"] = "Pending";
    ZomatoOrderStatus["Confirmed"] = "Confirmed";
    ZomatoOrderStatus["InProgress"] = "In Progress";
    ZomatoOrderStatus["OutForDelivery"] = "Out for Delivery";
    ZomatoOrderStatus["Delivered"] = "Delivered";
    ZomatoOrderStatus["Cancelled"] = "Cancelled";
})(ZomatoOrderStatus || (ZomatoOrderStatus = {}));
// FoodDelivery class to implement the food delivery system functionality
class Zomato {
    constructor() {
        this.users = [];
        this.restaurants = [];
        this.orders = [];
    }
    // User Management functions
    registerUser(name, email, password, address) {
        const user = {
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
    login(email, password) {
        const user = this.users.find((user) => user.email === email && user.password === password);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        return user;
    }
    // Restaurant Management functions
    addRestaurant(name, address, menu) {
        const restaurant = {
            id: Date.now().toString(),
            name,
            address,
            menu,
        };
        this.restaurants.push(restaurant);
        return restaurant;
    }
    getRestaurantById(id) {
        const restaurant = this.restaurants.find((restaurant) => restaurant.id === id);
        if (!restaurant) {
            throw new Error(`Restaurant with ID ${id} not found`);
        }
        return restaurant;
    }
    getRestaurantsByLocation(location) {
        return this.restaurants.filter((restaurant) => restaurant.address.city === location.city);
    }
    // Order Management functions
    placeZomatoOrder(user, restaurantId, items, deliveryAddress, deliveryTime) {
        const restaurant = this.getRestaurantById(restaurantId);
        const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const order = {
            id: Date.now().toString(),
            restaurant,
            items,
            total,
            zomatostatus: ZomatoOrderStatus.Pending,
            deliveryAddress,
            deliveryTime,
            status: OrderStatus.Pending
        };
        user.orders.push(order);
        return Object.assign(Object.assign({}, user), { invoice: order });
    }
}
