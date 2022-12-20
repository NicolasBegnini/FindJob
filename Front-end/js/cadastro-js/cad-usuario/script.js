//paginação
const proximo = document.querySelector('#proximo')
const voltar = document.querySelector('#voltar')
const cadastroP = document.querySelector('.cadastroP')
const cadastro = document.querySelector('.cadastro')

proximo.addEventListener('click', () => {

  cadastro.classList.add('close')
  cadastroP.classList.add('open');
  /*   if (Inome.value == '' || Icpf.value == '') {
      let msgText = "Preencha todos os campos!";
      msgErro(msgText);
    }
    else {
    }
   */
})
voltar.addEventListener('click', () => {
  cadastro.classList.remove('close')
  cadastroP.classList.remove('open');
})


function sendEmail() {
  var params = {
    name: document.getElementById("nome").value,
    email: document.getElementById("email").value

  };
  const serviceId = 'service_78e3oad';
  const templateId = 'template_bg0kdir';

  emailjs.send(serviceId, templateId, params)
  .then((res) => {
        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";
    

      })
    .catch(function (err) {

      console.log('failed', err);
    }
    );
}




const url = "http://localhost:8080/api/usuario/";

const formulario = document.querySelector('form');
const Icpf = document.querySelector('#cpf');
const Inome = document.querySelector('#nome');
const Iemail = document.querySelector('#email');
const Isenha = document.querySelector('#senha');
const IrepitaSenha = document.querySelector('#repitaSenha');


function cadastrar() {
  axios.post(url, {
    nome: Inome.value,
    cpf: Icpf.value,
    email: Iemail.value,
    senha: Isenha.value,
    tipoUsuario: "USUARIO",
  })
    .then((response) => {
      console.log(JSON.stringify(response.data));
      msgErro(msgText = "Cadastrado com sucesso!", color = "green");

    })
    .catch((error) => console.log(error) );

};

function limpar() {

  Inome.value = '';

  Icpf.value = '';

  Iemail.value = '';

  Isenha.value = '';

  IrepitaSenha.value = '';

}

formulario.addEventListener('submit', function (event) {
  event.preventDefault(event);
  if (Inome.value == '' || Icpf.value == '' || Iemail.value == '' || Isenha.value == '') {
    msgErro(msgText = "Preencha todos os campos!", color = "red");
  }
  else if (Isenha.value != IrepitaSenha.value) {
    msgErro(msgText = "As senhas não coincidem!");
  }
  else {
    sendEmail()
    cadastrar();
    limpar();
   setTimeout(function () {
    window.location.replace('/../../../templates/login/login/login_user.html')
  }, 3000); // 3 segundos
  }


});


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
  
  div.forEach(element => {
    element.addEventListener('click', function () {
      element.remove();
    })
  });
}
  
  