const tBody = document.getElementById("tBody");
const users = JSON.parse(localStorage.getItem("users"));
const userLog = JSON.parse(localStorage.getItem("user"));

tBody.innerHTML = users
  .filter((user) => user.id !== userLog.id)
  .map(
    (user) =>
      `
  <tr>
    <th scope="row">${user.id}</th>
      <td>${user.usuario}</td>
      <td id-price-prod=${user.id}>${user.role}</td>
     
      <td>
        <button class="${
          user.deleted ? "btn btn-success" : "btn btn-danger"
        }" onclick="${
        user.deleted ? `habilitarUser(${user.id})` : `deleteUser(${user.id})`
      }">${user.deleted ? `Habilitar` : `Eliminar`}</button>

        <!-- Button trigger modal -->
        <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal-${
          user.id
        }">
          Editar
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal-${
          user.id
        }" tabindex="-1" aria-labelledby="exampleModalLabel-${
        user.id
      }" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel-${
                  user.id
                }">Usuario: ${user.usuario}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                  <form>
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Usuario</label>
                    <input type="text" value='${
                      user.usuario
                    }' name='user' class="form-control" id="idInputUser" aria-describedby="emailHelp">
                  </div>
                  <div class="mb-3">
                    <select class="form-select" aria-label="Default select example">
                      <option >Role Actual: ${
                        user.role === "admin" ? "Administrador" : "Usuario"
                      }</option>
                      <option value="${
                        user.role === "admin" ? "user" : "admin"
                      }">${
        user.role === "admin" ? "Usuario" : "Administrador"
      }</option>
                    </select>
                  </div>
                 
                  <button type="button" class="btn btn-primary" onclick='saveChange(${
                    user.id
                  })'>Guardar Cambios</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </td>
  </tr>
`
  )
  .join("");

const idInputUser = document.getElementById("idInputUser");
const idInputRole = document.getElementById("idInputRole");

const userDataForm = {
  user: "",
  role: "",
};

const changeValueForm = (ev) => {
  const { name, value } = ev.target;
  userDataForm[name] = value;
};

const saveChange = (idUser) => {
  const userFilter = users.filter((user) => user.id === Number(idUser));
  const userPosition = users.findIndex((user) => user.id === Number(idUser));

  const userUpdate = {
    id: userFilter[0].id,
    usuario: userDataForm.user ? userDataForm.user : userFilter[0].user,
    contrasenia: userFilter[0].contrasenia,
    role: userDataForm.role ? userDataForm.role : userFilter[0].role,
    login: userFilter[0].login,
  };

  users[userPosition] = userFilter[0];
  localStorage.setItem("users", JSON.stringify(users));
  location.reload();
};

const deleteUser = (idUser) => {
  const confirmDel = confirm(
    "Estas seguro de que quieres eliminar este usuario?"
  );

  if (confirmDel) {
    const userFilter = users.filter((user) => user.id === Number(idUser));
    const userPostion = users.findIndex((user) => user.id === Number(idUser));

    userFilter[0].deleted = true;
    users[userPostion] = userFilter[0];
    localStorage.setItem("users", JSON.stringify(users));
    location.reload();
  }
};

const habilitarUser = (idUser) => {
  const confirmDel = confirm(
    "Estas seguro de que quieres habilitar este usuario?"
  );

  if (confirmDel) {
    const userFilter = users.filter((user) => user.id === Number(idUser));
    const userPostion = users.findIndex((user) => user.id === Number(idUser));

    userFilter[0].deleted = false;
    users[userPostion] = userFilter[0];
    localStorage.setItem("users", JSON.stringify(users));
    location.reload();
  }
};

idInputUser.addEventListener("input", changeValueForm);
idInputRole.addEventListener("input", changeValueForm);