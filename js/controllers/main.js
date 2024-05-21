import { sevicesproducts } from "../services/product-services.js";

const productcontainer = document.getElementById("productos");
const form = document.getElementById("formulario");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let nombre = document.getElementById("nombre").value;
  let precio = document.getElementById("precio").value;
  let url = document.getElementById("url").value;

  sevicesproducts.create_product(nombre, precio, url)
    .then((res) => {
      console.log(res);
      // Agregar el nuevo producto a la UI
      const newCard = create_card(res.nombre, res.precio, res.url, res.id);
      addDeleteEvent(newCard);
    })
    .catch((error) => console.log(error));
});

function create_card(nombre, precio, url, id) {
  let card = document.createElement("div");
  card.classList.add("producto");
  card.innerHTML = `
    <img src="${url}" alt="${url}">
    <h3>${nombre}</h3>
    <h4>$ ${precio}</h4>
    <button class="deleteButton" data-product-id="${id}">Eliminar</button>
  `;
  productcontainer.appendChild(card);
  return card;
}

function addDeleteEvent(card) {
  const deleteButton = card.querySelector(".deleteButton");
  deleteButton.addEventListener("click", () => {
    const productId = deleteButton.getAttribute('data-product-id');
    sevicesproducts.delete_product(productId)
      .then((data) => {
        if (data) {
          console.log("Producto eliminado:", data);
          card.remove();
        }
      })
      .catch((error) => console.log(error));
  });
}

const render = async () => {
  try {
    const listProducts = await sevicesproducts.productList();
    console.log(listProducts);
    listProducts.forEach(product => {
      const card = create_card(product.nombre, product.precio, product.url, product.id);
      addDeleteEvent(card);
    });
  } catch (error) {
    console.log(error);
  }
};

render();
