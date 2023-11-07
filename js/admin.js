const buttonLogout = document.getElementById("idLogout");

const userLogout = () => {
  const users = JSON.parse(localStorage.getItem("users"));
  const user = JSON.parse(localStorage.getItem("user"));
  const positionUser = users.findIndex((userLs) => userLs.id === user.id);

  user.login = false;
  users[positionUser] = user;

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.removeItem("user");

  setTimeout(() => {
    location.href = "../index.html";
  }, 1000);
};

buttonLogout.addEventListener("click", userLogout);