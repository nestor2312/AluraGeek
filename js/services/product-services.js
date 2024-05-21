const productList = () => {
  return fetch("http://localhost:3000/productos")
    .then((res) => res.json())
    .catch((error) => console.log(error));
};

const create_product = (nombre, precio, url) => {
  return fetch("http://localhost:3000/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre,
      precio,
      url,
    }),
  })
  .then((res) => res.json())
  .catch((error) => console.log(error));
}


const delete_product = (id) => {
  return fetch(`http://localhost:3000/productos/${id}`, {
    method: "DELETE",
  })
  .then((res) => {
    if (!res.ok) {
     console.log('ok')
    }
    return res.json(); 
  })
  .catch((error) => {
    console.error("Fetch error: ", error);
    return null; 
  });
};


export const sevicesproducts = {
  productList,create_product,delete_product
};
