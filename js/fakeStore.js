const divCards = document.getElementById("cardsFakeStore");
let productos = JSON.parse(localStorage.getItem("products"));
const divImgPrincipal = document.getElementById("idImg");
const prodDestacado = JSON.parse(localStorage.getItem("prodDest"));
const inputSearch = document.getElementById("idInputSearch");




if (productos === null || productos.length === 0) {
  productos = [
    {
      id: 1,
      title: "Godzilla VS Kong2",
      price: 500,
      description: "Monarch (Kyle Chandler) se embarca en una misión de alto riesgo y pone rumbo hacia territorios inexplorados para descubrir los orígenes de estos dos titanes, en un último esfuerzo por tratar de salvar a dos bestias que parecen tener las horas contadas sobre la faz de la Tierra.",
      image: "https://cnnespanol.cnn.com/wp-content/uploads/2021/04/descarga-6.jpeg?quality=100&strip=info://i0.wp.com/geeksroom.com/wp-content/uploads/2017/10/programacion-codigo-pixabay.jpg?resize=680%2C451&ssl=1",
    },
    {
      id: 2,
      title: "Joker",
      price: 500,
      description: "Arthur Fleck (Joaquin Phoenix) vive con su madre enferma (Frances Conroy) y trabaja como payaso de fiesta a principios de la década de 1980 en Gotham City. Lucha con una enfermedad mental que lo hace estallar en una risa siniestra en momentos extraños.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyhmElEHIGOGMwtMCMO5FtHJY8QqQvWtQxgg&usqp=CAU",
    },
    {
      id: 3,
      title: "Toy Story 4",
      price: 19.99,
      description: "Woody siempre ha tenido claro cuál es su labor en el mundo y cuál es su prioridad: cuidar a su dueño, ya sea Andy o Bonnie. Sin embargo, Woody descubrirá lo grande que puede ser el mundo para un juguete cuando Forky se convierta en su nuevo compañero de habitación. Los juguetes se embarcarán en una aventura de la que no se olvidarán jamás.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyfSY3n3IgVb8nBtlKhmL4WSIYO3V160plEQgT6YACSYDryV94TOct-sTXtaLq4YenqKM&usqp=CAU",
    },
    {
      id: 4,
      title: "Spiderman",
      price: 500,
      description: "Por primera vez en la historia cinematográfica de Spider-Man, se revela la identidad de nuestro héroe y amigable vecino, lo cual hace que sus responsabilidades como superhéroe entren en conflicto con su vida normal, así como que corran riesgo las personas que más quiere.",
      image: "https://media.revistagq.com/photos/61c9832dec2157b47d0637e7/16:9/w_2911,h_1637,c_limit/marvel-spiderman.jpeg",
    },
    {
      id: 5,
      title: "Breacking Bad",
      price: 350,
      description: "Un profesor de química con cáncer terminal se asocia con un exalumno suyo para fabricar y vender metanfetamina a fin de que su familia no pase apuros económicos",
      image: "https://ntvb.tmsimg.com/assets/p8696131_b_h10_aa.jpg?w=960&h=540",
    },
    {
      id: 6,
      title: "The Big Bang Theory",
      price: 350,
      category: "Desarrollo Web",
      description: "The Big Bang Theory centra su argumento en las peripecias de cuatro jóvenes científicos tan inteligentes como torpes en la vida social. Trabajan en el California Institute of Technology, el célebre CalTech con sede en Pasadena.",
      image: "https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2018/08/Big-Bang-Theory-1.jpg?fit=1200%2C675&quality=50&strip=all&ssl=1",
    },
    {
      id: 7,
      title: "Better call Saul",
      price: 350,
      description: "Esta precuela de Breaking Bad nominada al Emmy narra la vida del picapleitos Jimmy McGill y su transformación en Saul Goodman, el abogado de moral laxa. Ve todo lo que quieras. Esta precuela de Breaking Bad fue nominada a los Emmy al mejor drama, mejor actor protagonista y actor de reparto.",
      image: "https://m.media-amazon.com/images/S/pv-target-images/fe1c0138b7b0e05ea22a711f44e57cd80cfbaea30745c425b7043d786ba66cd1.jpg",
    },
    {
      id: 8,
      title: "Game of Thrones",
      price: 350,
      description: "`En un mundo fantástico y en un contexto medieval varias familias, relativas a la nobleza, se disputan el poder para dominar el territorio ficticio de Poniente (Westeros) y tomar el control de los Siete Reinos desde el Trono de Hierro, lugar donde el rey ejerce el poder.",
      image: "https://www.carlost.net/wp-content/uploads/2019/03/Game-of-Thrones-Temporada-8-Final-Carlost-HBO-2019.jpg",
    },
  ];

  // Guarda tus productos en el localStorage.
  localStorage.setItem("products", JSON.stringify(productos));
}

// Usa tus productos en lugar de los productos de la API.
divCards.innerHTML = productos
  .map(
    (product) =>
      `
       <div class="col-12 col-md-6 col-lg-3 gy-3">
          <div class="card h-100">
            <img
              src="${product.image}"
              class="card-img-top class-img"
              alt="..."
              style="object-fit: cover; height: 200px;" <!-- Ajusta la altura de la imagen como desees -->
           
            <div class="card-body d-flex flex-column">
              <h5 class="card-title card-title-ellipse">${product.title}</h5>
              <p class="card-text card-p-ellipse">${product.description}</p>
              <a href="../html/producto.html?id=${product.id}" class="btn btn-primary mt-auto botonGoClass">Ver Más</a>
            </div>
          </div>
        </div>
       `
  )
  .join("");

  divImgPrincipal.innerHTML = prodDestacado.map(
    (prod) =>
      `
  <img
    src="${prod.image}"
    alt=""
    class="class-img-principal"
  />
  
  `
  );
  
  const searchProd = (ev) => {
    const { value } = ev.target;
    const res = productos.filter((prod) =>
      prod.title.toLowerCase().includes(value.toLowerCase())
    );
  
    res.length > 0
      ? (divCards.innerHTML = res
          .map(
            (product) =>
              `
         <div class="col-12 col-md-6 col-lg-3">
            <div class="card">
            <img
                src="${product.image}"
                class="card-img-top class-img"
                alt="${product.description}"
            />
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">
                ${product.description}
                </p>
                <a href="../html/product.html?id=${product.id}" class="btn btn-primary botonGoClass"
                >Ver Mas</a
                >
            </div>
            </div>
      </div>
         `
          )
          .join(""))
      : (divCards.innerHTML = `<h2 class="text-center py-5">Produto no encontrado</h2>`);
  };
  
  inputSearch.addEventListener("input", searchProd);
  