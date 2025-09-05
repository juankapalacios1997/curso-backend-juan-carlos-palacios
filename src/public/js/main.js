const socket = io("http://localhost:8080");

const listaProductos = document.getElementById("listaProductos");

function renderProduct(product) {
    const li = document.createElement("li");
    li.id = `product-${product.id}`;
    li.style =
        "max-width: 22vw; margin: 12px; padding: 22px; background-color: rgb(165,0,0); color: white;";
    li.innerHTML = `
        <div>${product.title}</div>
        <div>${product.description}</div>
        <div>$${product.price}</div>
        <div>${product.stock}</div>
        <div style="margin-top: 12px;">
            <button class="deleteBtn" data-id="${product.id}">Delete</button>
        </div>
    `;
    return li;
}

socket.on("connect", () => console.log("connected", socket.id));


socket.on("productAdded", (product) => {
  console.log("New product received:", product);

  const li = renderProduct(product);
  listaProductos.appendChild(li)
});