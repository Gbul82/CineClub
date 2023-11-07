const productos = JSON.parse(localStorage.getItem (`productos`)) || [];
const tbody = document.getElementById("tbody");

tbody.innerHTML = productos.map ((producto) =>
`
<tr>
  <th scope="row">${producto.id}</th>
  <td>${producto.nombre}</td>
  <td>${producto.precio}</td>
  <td><img src="${producto.img}" alt="" width="30"></td>
  <td>${producto.descripcion}</td>

  
    <td>
      
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary botn-custom" data-bs-toggle="modal" data-bs-target="#exampleModal-${producto.id}">
          Editar
        </button>
        
        <!-- Modal -->
        <div class="modal fade" id="exampleModal-${producto.id}" tabindex="-1" aria-labelledby="exampleModalLabel-${producto.id}" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5 text-dark" id="exampleModalLabel">Cine Club</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                   <form class="text-dark">
                      <div class="mb-3">
                         <label for="exampleInputPassword1" class="form-label">Precio</label>
                         <input type="text" class="form-control" id="idInputPrecio" value=" ${producto.nombre}" name= "precio">
                      </div>
                      <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Precio</label>
                        <input type="text" class="form-control" id="idInputPrecio" value=" ${producto.precio}" name= "precio">
                      </div>
                      <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Imagen</label>
                        <input type="text" class="form-control" id="idInputImg" value=" ${producto.img}" name= "imagen">
                      </div>
                      <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Descripcion</label>
                        <input type="text" class="form-control" id="idInputDesc" value=" ${producto.descripcion}" name= "descripcion">
                      </div>
                    
                      <button type="button" class="btn btn-primary botn-custom" id= "idBotonGuardar" onclick="enviarDatos(${producto.id}">Guardar</button>
                    </form>
                </div>
                
            </div>
          </div>
        </div>

          <button type="button" class="btn btn-warning botn-custom">Destacar</button>
          <button type="button" class="btn btn-danger botn-custom" onclick="borrarProducto(${producto.id})">Eliminar</button>
    </td>
 
</tr>
`
)
.join(""); 

   const idInputNombre = document.getElementById (`idInputNombre`); 
   const idInputPrecio = document.getElementById (`idInputPrecio`); 
   const idInputImg = document.getElementById (`idInputImg`); 
   const idInputDesc = document.getElementById (`idInputDesc`); 
   const idBotonGuardar = document.getElementById (`idBotonGuardar`);

  const valoresDelFormulario = {
  nombre:"",
  precio:"",
  img: "",
  descripcion: "",
};

  const cambioValorInput = (ev) => {
  const {name, value} = ev.target;
  valoresDelFormulario [name] = value;

};
 
const enviarDatos = (idProd) =>{
  const obtenerIndice = productos.findIndex(
    (producto) => producto.id === idProd
  );
  
  
  const editarProducto = {
    nombre: valoresDelFormulario.nombre ? valoresDelFormulario.nombre : productos[obtenerIndice].nombre,
    precio: valoresDelFormulario.precio ? valoresDelFormulario.precio : productos[obtenerIndice].precio,
    img: valoresDelFormulario.img ? valoresDelFormulario.img : productos[obtenerIndice].img,
    descripcion: valoresDelFormulario.descripcion? valoresDelFormulario.descripcion : productos[obtenerIndice].descripcion,


  };

  productos[obtenerIndice] = editarProducto;
  
  localStorage.setItem(`productos`, JSON.stringify(productos))
  location.reload();

};

   

 


  const borrarProducto = (idProducto) => {
  const confirmarBorrado = confirm(`Estas seguro que quieres borrar este producto`);
 
  if(confirmarBorrado){
      const filtrarProductos = productos.filter((producto) => producto.id !== idProducto)
      localStorage.setItem(`productos`,JSON.stringify(filtrarProductos))
      location.reload()
  }
};

idInputNombre.addEventListener (`input`,cambioValorInput);
idInputPrecio.addEventListener (`input`,cambioValorInput);
idInputImg.addEventListener (`input`,cambioValorInput);
idInputDesc.addEventListener (`input`,cambioValorInput);


