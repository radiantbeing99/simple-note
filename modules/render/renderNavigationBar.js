export function renderNavigationBar() {
  const $navigationBar = document.querySelector("#navigation-bar");
  $navigationBar.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">
              <img src="./logo_light.png" alt="" width="30" height="30" class="d-inline-block align-text-top" />
              Simple Note</a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link" aria-current="page" href="/">Home</a>
                </li>
              </ul>
              <div class="d-flex d-none" id="nav-right-components">
                <span class="navbar-text me-3" id="user-name-space"></span>
                <button class="btn btn-outline-danger" type="button" id="sign-out-button">Sign Out</button>
              </div>
            </div>
        </div>
    </nav>
    `;
}

export function renderUserNameInNav() {
  const userName = localStorage.getItem("nickname");
  let greetingMessage = null;
  if (!userName) {
    greetingMessage = "";
  } else {
    greetingMessage = `Hello, ${userName}`;
  }

  const _userNameSpace = document.querySelector("#user-name-space");
  _userNameSpace.innerText = greetingMessage;
}
