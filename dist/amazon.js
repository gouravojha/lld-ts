"use strict";
// OrderStatus enum to store order status options
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["Pending"] = "Pending";
    OrderStatus["Confirmed"] = "Confirmed";
    OrderStatus["Shipped"] = "Shipped";
    OrderStatus["Delivered"] = "Delivered";
    OrderStatus["Cancelled"] = "Cancelled";
})(OrderStatus || (OrderStatus = {}));
// Amazon class to implement the e-commerce website functionality
class Amazon {
    constructor() {
        this.users = [];
        this.products = [];
    }
    // User Management functions
    registerUser(name, email, password, billingAddress, shippingAddress) {
        const user = {
            id: Date.now().toString(),
            name,
            email,
            password,
            billingAddress,
            shippingAddress,
            cart: { items: [], total: 0 },
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
    // Product Management functions
    addProduct(product) {
        this.products.push(product);
    }
    getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        if (!product) {
            throw new Error(`Product with ID ${id} not found`);
        }
        return product;
    }
    getProductsByName(name) {
        return this.products.filter((product) => product.name.includes(name));
    }
    getProductsByPriceRange(minPrice, maxPrice) {
        return this.products.filter((product) => product.price >= minPrice && product.price <= maxPrice);
    }
    // Cart Management functions
    addToCart(user, productId, quantity) {
        const product = this.getProductById(productId);
        const item = {
            id: Date.now().toString(),
            name: product.name,
            price: product.price,
            quantity,
        };
        user.cart.items.push(item);
        user.cart.total += item.price * item.quantity;
    }
    removeFromCart(user, productId) {
        let cartClone = [...user.cart.items];
        let newCart = [];
        let count = 0;
        let price = 0;
        for (let obj of cartClone) {
            if (obj.id !== productId) {
                newCart.push(obj);
            }
            else {
                count++;
                price = obj.price;
            }
        }
        user.cart.items = newCart;
        user.cart.total -= price * count;
    }
}
