const idProd = location.search.split("=")[1];
const divCard = document.getElementById("cardsFakeStore");
const products = JSON.parse(localStorage.getItem("products"));

const filterProd = products.filter((prod) => prod.id === Number(idProd)); 

divCard.innerHTML = filterProd.map(
  (product) => 
  `
    <div class="container-fluid">
        <div> 
            <img
                src="${product.image}"
                class="card-img-top img-fluid"
                alt="..."
            />
            <div class="card-body">
              <h5 class="card-title text-white mt-5">${product.title}</h5>
              <p class="card-text text-white mt-5">
                  ${product.description}
              </p>
              <button class='btn btn-primary' onclick="addCart(${product.id})">Añadir Carrito</button>
              <button class='btn btn-success' onclick="addFavorite(${product.id})">Añadir Favoritos</button>
          </div>
       </div>
    
    </div>
         
   `
 );
 
 const addCart = async (id) => {
   const userExist = JSON.parse(localStorage.getItem("user"));
   const cartLs = JSON.parse(localStorage.getItem("cart")) || [];
   const filterCart = cartLs.filter((prod) => prod.id === id);
 
   if (userExist) {
     try {
       if (filterCart.length > 0) {
         alert("El Producto ya existe en el carrito");
       } else {
         const filterProd = products.filter((prod) => prod.id === Number(id));
         cartLs.push(filterProd[0]);
         localStorage.setItem("cart", JSON.stringify(cartLs));
       }
     } catch (error) {
       console.log(error);
     }
   } else {
     location.href = "../html/iniciar-sesion.html";
   }
 };
 
 const addFavorite = async (id) => {
   const userExist = JSON.parse(localStorage.getItem("user"));
   const favLs = JSON.parse(localStorage.getItem("favorite")) || [];
   const filterFav = favLs.filter((fav) => fav.id === id);
 
   if (userExist) {
     try {
       if (filterFav.length > 0) {
         alert("El Producto ya existe en Favoritos");
       } else {
         const filterFav = products.filter((prod) => prod.id === Number(id));
         favLs.push(filterFav[0]);
         localStorage.setItem("favorite", JSON.stringify(favLs));
       }
     } catch (error) {
       console.log(error);
     }
   } else {
     location.href = "../html/iniciar-sesion.html";
   }
 };