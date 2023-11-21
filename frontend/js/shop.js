const api = "http://localhost:8081";
async function getAllCategories() {
    const categories = await fetch(`${api}/v1/categories`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
    return categories;
}
async function showCategories() {
    const categories = await getAllCategories();
    let html = "";
    categories.forEach((category) => {
        html += `
        <li class="nav-item">
            <a class="nav-link" href="category.html?id=${category.id}">${category.name}</a>
        </li>
        `;
    });
}

async function getAllProducts() {
    const products = await fetch(`${api}/v1/products`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
    return products;
}
async function getAllProductsByCategory(id) {
    const products = await fetch(`${api}/v1/categories/${id}/products`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
    return products;
}
async function getAllProductsBySearch(search) {
    const products = await fetch(`${api}/v1/products?search=${search}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
    return products;
}
async function getProductById(id) {
    const product = await fetch(`${api}/v1/products/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
    return product;
}
async function getCart() {
    const cart = await fetch(`${api}/v1/cart`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((res) => res.json());
    return cart;
}
async function addToCart(id) {
    const cart = await fetch(`${api}/v1/cart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            productId: id,
        }),
    }).then((res) => res.json());
    return cart;
}
async function deleteCart(id) {
    const cart = await fetch(`${api}/v1/cart/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((res) => res.json());
    return cart;
}
async function updateCart(id, quantity) {
    const cart = await fetch(`${api}/v1/cart/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            quantity: quantity,
        }),
    }).then((res) => res.json());
    return cart;
}
async function getOrders() {
    const orders = await fetch(`${api}/v1/orders`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((res) => res.json());
    return orders;
}
async function createOrder() {
    const order = await fetch(`${api}/v1/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((res) => res.json());
    return order;
}
async function deleteOrder(id) {
    const order = await fetch(`${api}/v1/orders/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    }).then((res) => res.json());
    return order;
}
async function updateOrder(id, status) {
    const order = await fetch(`${api}/v1/orders/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            status: status,
        }),
    }).then((res) => res.json());
    return order;
}
