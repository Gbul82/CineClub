const tBody = document.getElementById("tBody");
const cartLs = JSON.parse(localStorage.getItem("cart")) || [];

tBody.innerHTML = cartLs.map(
  (product) =>
    `
  <tr>
    <th scope="row">${product.id}</th>
    <td>${product.title}</td>
    <td id-price-prod=${product.id}>${product.price}</td>
    <td>
     <input type='number' id="${product.id}" class="form-control w-50" value="1">
    </td>
    <td id-prod=${product.id}>
      ${product.price}
    </td>
    <td>
      <button class="btn btn-danger" onclick="prodDel(${product.id})">Eliminar</button>
    </td>
  </tr>
`
);

const prodDel = (id) => {
  const confirmDelete = confirm(
    "Estas seguro de querer eliminar a este producto ?"
  );

  if (confirmDelete) {
    const cartFilter = cartLs.filter((prod) => prod.id !== id);
    localStorage.setItem("cart", JSON.stringify(cartFilter));
    location.reload();
  }
};

const inputsCount = document.querySelectorAll("input");

const changeValue = (ev) => {
  const { id, value } = ev.target;
  const price = parseFloat(
    document.querySelector(`[id-price-prod="${id}"]`).textContent
  );

  const res = price * value;
  const total = document.querySelector(`[id-prod="${id}"]`);
  total.innerHTML = res.toFixed(2);
};

inputsCount.forEach((input) => {
  input.addEventListener("input", changeValue);
});

const payProd = () => {
  const userLs = JSON.parse(localStorage.getItem("user"));

  Email.send({
    SecureToken: "92f40e33-a1b2-4325-82e9-d4e93daa6a59",
    Host: "smtp.elasticemail.com",
    Username: "andresperlo5@gmail.com",
    Password: "46A9489E0810CD5D6CA565A93D2762847965",
    To: userLs.usuario,
    From: "andresperlo5@gmail.com",
    Subject: "Pago Exitoso!!!",
    Body: `<h1>Gracias por tu compra</h1>`,
  }).then((message) => {
    if (message === "OK") {
      alert("Revisa tu correo. Pago exitoso");
    } else {
      console.log(message);
    }
  });
};