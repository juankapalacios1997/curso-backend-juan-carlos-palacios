const socket = io("http://localhost:8080");

const listaProductos = document.getElementById("listaProductos");

function renderProduct(product) {
    const li = document.createElement("li");
    li.id = `product-${product.id}`;
    li.style =
        "max-width: 22vw; margin: 12px; padding: 22px; background-color: rgb(165,0,0); color: white; border-radius: 24px;";
    li.innerHTML = `
        <div>${product.title}</div>
        <div>${product.description}</div>
        <div>$${product.price}</div>
        <div>${product.stock}</div>
    `;
    return li;
}

socket.on("connect", () => console.log("connected", socket.id));


socket.on("productAdded", (product) => {
    console.log("New product received:", product);

    const li = renderProduct(product);
    listaProductos.appendChild(li)
});

socket.on("productUpdated", (product) => {
    console.log("Updated product:", product);

    const old = document.getElementById(`product-${product.id}`);
    if (old) old.replaceWith(renderProduct(product));
});

socket.on("productDeleted", (id) => {
    console.log("Deleted product:", id);

    const old = document.getElementById(`product-${id}`);

    console.log(old);
    old.remove(old);
});