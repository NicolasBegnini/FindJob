

//função para abrir a navbar
sidebarLeft = document.querySelector('.nav-left')
sidebarTop = document.querySelector('.nav-top')
header = document.querySelector(".header")
toggle = document.querySelector(".toggle")

toggle.addEventListener("click", () => {
  sidebarTop.classList.toggle("close")
  sidebarLeft.classList.toggle("close")
  header.classList.toggle('close')
    ;
})


var token = sessionStorage.getItem("token")

deslogar = document.querySelector('.sair').addEventListener('click', function () {
  sessionStorage.removeItem("token");
}
)


