
 var token = sessionStorage.getItem("token")

 function parseJwt(token) {
   var base64Url = token.split('.')[1];
   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
   var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
   }).join(''));
 
   return JSON.parse(jsonPayload);
 };
 
 const payload = parseJwt(token)
 const tipoUser = payload.tipoUser;
 if (tipoUser == "administrador") {
   if(payload.ativo == false){
     window.location.replace('/../../../templates/login/login/login_adm.html')
    
   
   }
 }

 
const nomeSpan = document.getElementById('nomeSpan').innerHTML = payload.name;
const emailSpan = document.getElementById('emailSpan').innerHTML = payload.email;
const cpfSpan = document.getElementById('cpfSpan').innerHTML = payload.cpf;


const nome = document.getElementById('nome');
const email = document.getElementById('email');
const cpf = document.getElementById('cpf');
const senha = document.getElementById('senha');
const confirmaSenha = document.getElementById('confirmaSenha');





url = "http://localhost:8080/api/adm";
function criaAdm() {
    axios.post(url, {
        nome: nome.value,
        email: email.value,
        cpf: cpf.value,
        senha: senha.value,
        tipoUsuario: "ADMINISTRADOR",
        ativo: true,
    })
        .then((response) => {
            console.log(JSON.stringify(response.data));
            msgErro(msgText = "Cadastrado com sucesso!", color = "green");
        })
        .catch((error) => console.log(error) + msgErro(msgText = "Erro ao cadastrar!", color = "red"));

};

var modalAdm = new bootstrap.Modal(document.getElementById('modalEdit'));
document.querySelector('#editAdm').addEventListener('click', function () {
    modalAdm.show();
    document.getElementById('salvarEdit').addEventListener('click', function () {
        modalAdm.hide();
    });
}
)


var newAdm = new bootstrap.Modal(document.getElementById('newAdm'));
document.querySelector('#addAdm').addEventListener('click', function () {
    newAdm.show();
    document.getElementById('salvaAdm').addEventListener('click', function (e) {
        e.preventDefault();
        criaAdm();
        newAdm.hide();
    });
})



function editaAdm(id = payload.id) {
    axios.put(`http://localhost:8080/api/adm/editaadm/${id}`, {
        nome: nome.value,
        email: email.value,
        cpf: cpf.value,
})
        .then((response) => {
            console.log(JSON.stringify(response.data));
            msgErro(msgText = "Editado com sucesso!", color = "green");
        })
        .catch((error) => console.log(error) + msgErro(msgText = "Erro ao editar!", color = "red"));

};



//=========================================================== Menssagem de erro =============================================================================//

function msgErro(msgText, color) {

    const div = document.createElement('div');

    div.classList.add('msg');
    div.style.borderLeft = `solid 10px ${color}`;
    div.innerText = msgText;
    document.body.appendChild(div);


    setTimeout(function () {
        div.classList.add('close')
    }, 3000); // 5 segundos
    setTimeout(function () {
        div.remove();
    }, 6000); // 6 segundos

}