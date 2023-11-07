const divCards = document.getElementById("divCards");
const favLs = JSON.parse(localStorage.getItem("favorite")) || [];

divCards.innerHTML = favLs.map(
  (fav) =>
    `

  <div class="col-12 col-md-4 col-lg-3">
    <div class="card" style="width: 18rem;">
    <img src="${fav.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${fav.title}</h5>
        <button class="btn btn-danger" onclick="deleteFav(${fav.id})">Eliminar</button>
    </div>
</div>
  
  </div>

`
);

const deleteFav = (idFav) => {
  const confirmDeleteFav = confirm(
    "Estas seguro de que quieres eliminar a este Favorito?"
  );

  if (confirmDeleteFav) {
    const filterFav = favLs.filter((fav) => fav.id !== idFav);
    localStorage.setItem("favorite", JSON.stringify(filterFav));
    location.reload();
  }
};