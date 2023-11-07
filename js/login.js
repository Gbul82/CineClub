const inputUser = document.getElementById("inputUser");
const inputPass = document.getElementById("inputPass");
const buttonLog = document.getElementById("buttonLog");

const objForm = {
  user: "",
  pass: "",
};

const formValues = (ev) => {
  const { name, value } = ev.target;
  objForm[name] = value;
};

const sendForm = (ev) => {
  ev.preventDefault();
  const { user, pass } = objForm;
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const filterUser = users.filter((userLs) => userLs.usuario === user);

  if (filterUser.length > 0) {
    if (filterUser[0].contrasenia === pass && !filterUser[0].deleted) {
      filterUser[0].login = true;

      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("user", JSON.stringify(filterUser[0]));

      filterUser[0].role === "admin"
        ? (location.href = "../html/admin.html")
        : (location.href = "../html/user.html");
    } else {
      alert("Usuario y/o Contraseña incorrecto Deleted");
    }
  } else {
    alert("Usuario y/o Contraseña incorrecto");
  }
};

inputPass.addEventListener("input", formValues);
inputUser.addEventListener("input", formValues);
buttonLog.addEventListener("click", sendForm);