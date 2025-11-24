const socket = io("http://localhost:8080");

const listaProductos = document.getElementById("listaProductos");

const cartProducts = document.getElementById("cartProducts");

const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

const buyAllBtn = document.querySelector("#buyAllBtn");

function renderProduct(product, cart) {
    const li = document.createElement("li");
    li.id = `product-${product._id}`;
    li.style =
        "max-width: 22vw; margin: 12px; padding: 22px; background-color: rgb(165,0,0); color: white; border-radius: 24px;";
    li.innerHTML = `
        <div>${product.title}</div>
        <div>${product.description}</div>
        <div>$${product.price}</div>
        <div>${product.stock}</div>
        <button class="add-to-cart" data-pid="${product._id}" data-cid="${cart._id}">Anadir al carrito</button>
    `;
    return li;
}

function renderCartProduct(item) {
    const li = document.createElement("li");
    li.id = `cart-${item.product._id}`;
    li.style =
        "max-width: 22vw; margin: 12px; padding: 22px; background-color: rgb(0, 165, 0); color: white; border-radius: 24px;";
    li.innerHTML = `
        <div>${item.product.title}</div>
        <div>$${item.product.price}</div>
        <div>${item.quantity}</div>
    `;
    return li;
}

listaProductos.addEventListener("click", async (e) => {
    if (e.target.classList.contains("add-to-cart-btn")) {
        const cartId = e.target.dataset.cid;
        const productId = e.target.dataset.pid;

        await fetch(`http://localhost:8080/carts/${cartId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pid: productId,
            }),
        })
    }
});

buyAllBtn.addEventListener("click", async(e) => {
    const cartId = e.target.dataset.cid;

    await fetch(`http://localhost:8080/carts/${cartId}/buy`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
    })
});

socket.on("connect", () => console.log("connected", socket.id));


socket.on("productAdded", (product) => {
    const li = renderProduct(product);
    listaProductos.appendChild(li)
});

socket.on("productUpdated", (product, cart) => {
    console.log("Updated product:", product);

    const old = document.getElementById(`product-${product._id}`);
    if (old) old.replaceWith(renderProduct(product, cart));

    const newVal = document.getElementById(`product-${product._id}`);

    newVal.addEventListener("click", async (e) => {
        const cartId = e.target.dataset.cid;
        const productId = e.target.dataset.pid;

        await fetch(`http://localhost:8080/carts/${cartId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                pid: productId,
            }),
        })
    })
});

socket.on("productDeleted", (id) => {
    console.log("Deleted product:", id);

    const old = document.getElementById(`product-${id}`);

    old.remove(old);
});

socket.on("cartUpdated", (updatedCartItem) => {
    console.log("Updated cart:", updatedCartItem);
    
    const selector = `#cart-${updatedCartItem.product._id}`;
    const li = document.querySelector(selector);

    if (li) {
        const qtyDiv = li.querySelector(".cart-qty");
        if (qtyDiv) qtyDiv.textContent = updatedCartItem.quantity;
        return;
    }

    cartProducts.appendChild(renderCartProduct(updatedCartItem));
});

socket.on("cartWipedOut", () => {
    console.log("Cart wiped out!");

    const liItems = cartProducts.querySelectorAll("li");
    liItems.forEach(li => li.remove(li));
})