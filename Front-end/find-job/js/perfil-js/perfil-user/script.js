
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


axios.get(`http://localhost:8080/api/usuario/especifico/${payload.id}`)
    .then(function (response) {
        console.log(response);
        nome.innerHTML = response.data.nome;
        email.innerHTML = response.data.email;
        cpf.innerHTML = response.data.cpf;


//alterar dados
var modalUser = new bootstrap.Modal(document.getElementById('modalEdit'));
document.querySelector('#editUser').addEventListener('click', function () {
    modalUser.show();
    document.getElementById('salvarEdit').addEventListener('click', function () {
        if (nomeUser.value == "" || emailUser.value == "" || cpfUser.value == "") {
            msgErro('Preencha todos os campos!', 'red')
        }
        else {
        alteraDados(id = payload.id)
        modalUser.hide();
        }
    });
}
)
nome = response.data.nome;
email = response.data.email;
cpf = response.data.cpf;



const nomeUser = document.getElementById('nomeUser')
const emailUser = document.getElementById('emailUser')
const cpfUser = document.getElementById('cpfUser')

nomeUser.value = nome
emailUser.value = email;
cpfUser.value = cpf;

function alteraDados(){
   
    axios.put(`http://localhost:8080/api/usuario/editausuario/${payload.id}`, {
        id: id,
        nome: nomeUser.value,
        email: emailUser.value,
        cpf: cpfUser.value,
        senha: payload.senha,
        tipoUsuario: "USUARIO"
    })
        .then(function (response) {
            console.log(response);
            msgErro('Dados alterados com sucesso!', 'green')
            location.reload();
        }
        ).catch(function (error) {
            console.log(error);
            msgErro('Erro ao alterar dados!', 'red')
        }
        );
}

//alterar senha

/* const senhaAtual = document.getElementById('senhaAtual').value
const novaSenha = document.getElementById('novaSenha')
const confirmaNovaSenha = document.getElementById('confirmaNovaSenha')
 

function alterarSenha(){
    axios.put(`http://localhost:8080/api/usuario/editausuario/${payload.id}`, {
        id: id,
        nome: nomeUser.value,
        email: emailUser.value,
        cpf: cpfUser.value,
        senha: confirmaNovaSenha.value,
    })
        .then(function (response) {
            console.log(response);
            msgErro('Dados alterados com sucesso!', 'green')
        }
        ).catch(function (error) {
            console.log(error);
            msgErro('Erro ao alterar dados!', 'red')
        }
        );
    } 
    */
const alteraSenha = document.getElementById('alteraSenha');
const modalSenha = new bootstrap.Modal(document.getElementById('modalSenha'));
alteraSenha.addEventListener('click', function () {
    modalSenha.show();
    document.getElementById('salvarSenha').addEventListener('click', function () {
       /*  if (senhaAtual == payload.senha) {
            if (novaSenha.value == confirmaNovaSenha.value) {
                alterarSenha()
                modalSenha.hide();
            } else {
                msgErro('Senhas não conferem!', 'red')
            }
        } */
     
    });
}
)

//excluir conta
const excuirUser = document.getElementById('deleteUser')
const modalExcluir = new bootstrap.Modal(document.getElementById('modalDelUser'));
excuirUser.addEventListener('click', function () {
    modalExcluir.show();
    document.getElementById('excuirUser').addEventListener('click', function () {
        deleteUser()
        modalExcluir.hide();
    });
}
)
function deleteUser(){
    axios.delete(`http://localhost:8080/api/usuario/excluir/${payload.id}`)
    .then(function (response) {
        console.log(response);
        sessionStorage.clear();
        window.location.replace('/../../../templates/login/login/login_user.html')
    }
    ).catch(function (error) {
        console.log(error);
        
    })
}


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

}  }
).catch(function (error) {
    console.log(error);
})