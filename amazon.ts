// User interface to store user details
interface AmazonUser {
    id: string;
    name: string;
    email: string;
    password: string;
    billingAddress: Address;
    shippingAddress: Address;
    cart: Cart;
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

// Cart interface to store cart details
interface Cart {
    items: CartItem[];
    total: number;
}

// CartItem interface to store cart item details
interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

// Order interface to store order details
interface Order {
    id: string;
    items: OrderItem[];
    total: number;
    status: OrderStatus;
}

// OrderItem interface to store order item details
interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

// OrderStatus enum to store order status options
enum OrderStatus {
    Pending = 'Pending',
    Confirmed = 'Confirmed',
    Shipped = 'Shipped',
    Delivered = 'Delivered',
    Cancelled = 'Cancelled',
}

// Product interface to store product details
interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
}

// Amazon class to implement the e-commerce website functionality
class Amazon {
    private users: AmazonUser[];
    private products: Product[];

    constructor() {
        this.users = [];
        this.products = [];
    }

    // User Management functions

    public registerUser(name: string, email: string, password: string, billingAddress: Address, shippingAddress: Address): AmazonUser {
        const user: AmazonUser = {
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

    public login(email: string, password: string): AmazonUser {
        const user = this.users.find((user) => user.email === email && user.password === password);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        return user;
    }

    // Product Management functions

    public addProduct(product: Product): void {
        this.products.push(product);
    }

    public getProductById(id: string): Product {
        const product = this.products.find((product) => product.id === id);
        if (!product) {
            throw new Error(`Product with ID ${id} not found`);
        }
        return product;
    }

    public getProductsByName(name: string): Product[] {
        return this.products.filter((product) => product.name.includes(name));
    }

    public getProductsByPriceRange(minPrice: number, maxPrice: number): Product[] {
        return this.products.filter((product) => product.price >= minPrice && product.price <= maxPrice);
    }

    // Cart Management functions

    public addToCart(user: AmazonUser, productId: string, quantity: number): void {
        const product = this.getProductById(productId);
        const item: CartItem = {
            id: Date.now().toString(),
            name: product.name,
            price: product.price,
            quantity,
        };
        user.cart.items.push(item);
        user.cart.total += item.price * item.quantity;
    }

    public removeFromCart(user: AmazonUser, productId: string) : void {
        let cartClone = [...user.cart.items]
        let newCart = [] ; let count = 0 ; let price = 0
        for(let obj of cartClone){
            if(obj.id !== productId){
                newCart.push(obj)
            }else{
                count ++
                price = obj.price
            }
        }
        user.cart.items = newCart
        user.cart.total -= price * count;
    }
}




