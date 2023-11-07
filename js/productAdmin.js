const products = JSON.parse(localStorage.getItem("products")) || [];
const tBody = document.getElementById("tBody");

// Arreglos para los campos de entrada
const inputTitles = [];
const inputPrices = [];
const inputDescriptions = [];
const inputImages = [];

tBody.innerHTML = products
  .map((product) => {
    const productId = `product-${product.id}`;

    return `
      <tr>
        <th scope="row">${product.id}</th>
        <td>${product.title}</td>
        <td id-price-prod=${product.id}>${product.price}</td>
        <td><img src="${product.image}" alt="" width="30"></td>
        <td>${product.description}</td>



        <td>
          <button class="btn btn-danger botn-custom" onclick="deleteProd(${product.id})">Eliminar</button>
          <button type="button" class="btn btn-warning botn-custom" data-bs-toggle="modal" data-bs-target="#exampleModal-${productId}">
            Editar
          </button>

          <div class="modal fade" id="exampleModal-${productId}" tabindex="-1" aria-labelledby="exampleModalLabel-${productId}" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5 text-dark" id="exampleModalLabel-${productId}">Usuario: ${product.title}</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="mb-3">
                      <label for="idInputTitle-${productId}" class="form-label text-dark">Titulo</label>
                      <input type="text" value='${product.title}' name='title' class="form-control" id="idInputTitle-${productId}" aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                      <label for="idInputPrice-${productId}" class="form-label text-dark">Precio</label>
                      <input type="text" value='${product.price}' name='price' class="form-control" id="idInputPrice-${productId}">
                    </div>
                    
                    <div class="mb-3">
                      <label for="idInputDescription-${productId}" class="form-label text-dark">Descripcion</label>
                      <input type="text" value='${product.description}' name='description' class="form-control" id="idInputDescription-${productId}">
                    </div>
                    <div class="mb-3">
                      <label for="idInputImage-${productId}" class="form-label text-dark">Imagen</label>
                      <input type="text" value='${product.image}' name='image' class="form-control" id="idInputImage-${productId}">
                    </div>
                    <button type="button" class="btn btn-primary botn-custom" onclick='saveChangeProd("${productId}", ${product.id})'>Guardar Cambios</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <button class="btn btn-success botn-custom" onclick="destacarProd(${product.id})">Destacar</button>
        </td>
      </tr>
    `;
  })
  .join("");

const inputTitleElements = document.querySelectorAll('[id^="idInputTitle-"]');
const inputPriceElements = document.querySelectorAll('[id^="idInputPrice-"]');
const inputDescriptionElements = document.querySelectorAll('[id^="idInputDescription-"]');
const inputImageElements = document.querySelectorAll('[id^="idInputImage-"]');

inputTitleElements.forEach((input) => inputTitles.push(input));
inputPriceElements.forEach((input) => inputPrices.push(input));
inputDescriptionElements.forEach((input) => inputDescriptions.push(input));
inputImageElements.forEach((input) => inputImages.push(input));

const saveChangeProd = (productId, idProd) => {
  const prodPosition = products.findIndex((prod) => prod.id === Number(idProd));

  const prodUpdate = {
    id: idProd,
    title: inputTitles.find((input) => input.id === `idInputTitle-${productId}`).value,
    price: inputPrices.find((input) => input.id === `idInputPrice-${productId}`).value,
    description: inputDescriptions.find((input) => input.id === `idInputDescription-${productId}`).value,
    image: inputImages.find((input) => input.id === `idInputImage-${productId}`).value,
  };

  products[prodPosition] = prodUpdate;
  localStorage.setItem("products", JSON.stringify(products));
  location.reload();
};


const deleteProd = (idProd) => {
  Swal.fire({
    title: "Confirmación",
    text: "¿Estás seguro de que quieres eliminar este producto?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      const prodFilter = products.filter((prod) => prod.id !== Number(idProd));
      localStorage.setItem("products", JSON.stringify(prodFilter));
      location.reload();
    }
  });
};

const destacarProd = (idProd) => {
  const prodDestacado = JSON.parse(localStorage.getItem("prodDest")) || [];
  const prodFilter = products.filter((prod) => prod.id === Number(idProd));

  if (prodDestacado.length > 0) {
    Swal.fire({
      title: "Atención",
      text: "¿Estás seguro de que quieres cambiar el producto destacado?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem("prodDest", JSON.stringify(prodFilter));
        Swal.fire("¡Hecho!", "El producto se ha destacado.", "success");
      }
    });
  } else {
    localStorage.setItem("prodDest", JSON.stringify(prodFilter));
    Swal.fire("¡Hecho!", "El producto se ha destacado.", "success");
  }
};
