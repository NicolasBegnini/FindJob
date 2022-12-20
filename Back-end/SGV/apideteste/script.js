   const formulario = document.querySelector("form");

   console.log(formulario);

   const Inome = document.querySelector(".nome");
   const Iemail = document.querySelector(".email");
   const Imatricula = document.querySelector(".matricula");
   const Icpf = document.querySelector(".cpf");
   const Idatanasc = document.querySelector(".datanasc");
   const Iestadocivil = document.querySelector(".estadocivil");
   const Icep = document.querySelector(".cep");
   const Iendereco = document.querySelector(".endereco");
   const Inumero = document.querySelector(".numero");
   const Icomplemento = document.querySelector(".complemento");
   const Ibairro = document.querySelector(".bairro");
   const Icidade = document.querySelector(".cidade");
   const Iuf = document.querySelector(".uf");
   const Itelefone = document.querySelector(".telefone");
   const Icelular = document.querySelector(".celular");
   const Isenha = document.querySelector(".senha");

   function cadastrar() {
       fetch("http://localhost:8080/usuario", {

               headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json'
               },
               method: "POST",
               body: JSON.stringify({
                   nome: Inome.value,
                   email: Iemail.value,
                   matricula: Imatricula.value,
                   cpf: Icpf.value,
                   datanasc: Idatanasc.value,
                   estadoCivil: Iestadocivil.value,
                   cep: Icep.value,
                   endereco: Iendereco.value,
                   numero: Inumero.value,
                   complemento: Icomplemento.value,
                   bairro: Ibairro.value,
                   cidade: Icidade.value,
                   uf: Iuf.value,
                   telefone: Itelefone.value,
                   celular: Icelular.value,
                   senha: Isenha.value
               })
           })
           .then(function(res) { console.log(res) })
           .catch(function(res) { console.log(res) })
   }

   function limpar() {
       Inome.value = "";
       Iemail.value = "";
       Imatricula.value = "";
       Icpf.value = "";
       Idatanasc.value = "";
       Iestadocivil.value = "";
       Icep.value = "";
       Iendereco.value = "";
       Inumero.value = "";
       Icomplemento.value = "";
       Ibairro.value = "";
       Icidade.value = "";
       Iuf.value = "";
       Itelefone.value = "";
       Icelular.value = "";
       Isenha.value = "";
   };

   formulario.addEventListener('submit', function(event) {
       event.preventDefault();

       cadastrar();
       limpar();

   });