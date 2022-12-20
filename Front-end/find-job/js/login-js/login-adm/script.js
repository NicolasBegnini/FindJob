const formulario = document.querySelector('form');
const Icpf = document.getElementById('cpf');
const Isenha = document.getElementById('senha');


const logar = document.querySelector('#entrar').addEventListener('click',
    function (e) {
        e.preventDefault();
        entrar();
    })



const url = 'http://localhost:8080/api/adm/login'

function entrar() {
    axios.post(url, {
        cpf: Icpf.value,
        senha: Isenha.value

    }, {
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
          

        }
    })
        .then((resposta) => {
            console.log(resposta.data.token);
            sessionStorage.setItem("token", resposta.data.token);
            window.location.href = "/../../../templates/adm/home.html";
        }).catch((error) => {
            console.log(error)
            if (resposta.status == 401) {
                msgErro(msgText = "Usuario ou senha incorretos!", color = "red");
            }
        })

}

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

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};
