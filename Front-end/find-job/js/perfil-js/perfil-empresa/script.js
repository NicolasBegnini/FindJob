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

if (tipoUser == "empresa") {
    if (payload.ativo == false || payload.aprovado == false) {
        window.location.replace('/../../../templates/login/login/login_empresa.html')


    }
}

axios.get(`http://localhost:8080/api/empresa/buscaempresa/${payload.id}`)
    .then(function (response) {
        console.log(response);
        nome = response.data[0].nome;
        email = response.data[0].email;
        cnpj = response.data[0].cnpj;
        telefone = response.data[0].telefone;
        endereco = response.data[0].endereco;
        cidade = response.data[0].cidade;
        uf = response.data[0].uf;
        cep = response.data[0].cep;
        bairro = response.data[0].bairro;
        numero = response.data[0].numero;
        complemento = response.data[0].complemento;

        
   
console.log(cnpj);




const nomeEmpresa = document.querySelector('.nomeEmpresa');
const emailEmpresa = document.querySelector('.emailEmpresa');
const cnpjEmpresa = document.querySelector('.cnpjEmpresa');

nomeEmpresa.innerHTML = nome;
emailEmpresa.innerHTML = email;
cnpjEmpresa.innerHTML = cnpj;


var modalEmpresa = new bootstrap.Modal(document.getElementById('modalEdit'));
document.querySelector('#editEmpresa').addEventListener('click', function () {
    modalEmpresa.show();
    document.getElementById('salvarEdit').addEventListener('click', function () {
        editaEmpresa();
        modalEmpresa.hide();
    });
})
console.log(payload.id);

const url = "http://localhost:8080/api/empresa/vaga";

function cadastraVagas() {
    const tituloVaga = document.getElementById('tituloVaga');
    const emailContato = document.getElementById('emailContato');
    const telefoneContato = document.getElementById('telefoneContato');
    const whatsapp = document.getElementById('wppVaga');
    const desejaveis = document.getElementById('desejaveis');
    const descricao = document.getElementById('descricao');
    const requisitos = document.getElementById('requisitos');
    const cuidados = document.getElementById('cuidados');

    const beneficios = document.getElementById('beneficios');
    const site = document.getElementById('site');
    const salario = document.getElementById('salario');

    const areaProfissional = document.getElementById('areaProfissional');
    var opcaoTextoAreaProfissional = areaProfissional.options[areaProfissional.selectedIndex].text;

    const contratacao = document.getElementById('contratacao');
    var opcaoTextoContratacao = contratacao.options[contratacao.selectedIndex].text;

    const periodo = document.getElementById('periodo');
    var opcaoTextoPeriodo = periodo.options[periodo.selectedIndex].text;


    axios.post(url, {

            tituloVaga: tituloVaga.value,
            emailContato: emailContato.value,
            whatsapp: whatsapp.value,
            contato: telefoneContato.value,
            desejavel: desejaveis.value,
            descricao: descricao.value,
            requisitos: requisitos.value,
            cuidados: cuidados.value,
            expiracao: "expiracao",
            publicacao: "publicacao",
            beneficios: beneficios.value,
            site: site.value,
            salario: salario.value,
            contratacao: opcaoTextoContratacao,
            periodo: opcaoTextoPeriodo,
            ativo: false,
            areaProfissional: opcaoTextoAreaProfissional,

            empresa: {
                id: payload.id,
                nome: payload.name,
            }
        })


        .then(function (response) {
            console.log(response);
            msgErro(msgText = "Cadastrado com sucesso!!", color = "green");
            location.reload();
        })
        .catch(function (error) {
            console.log(error);
        });
}


const adicionaVaga = document.querySelector('#adiconaVaga')

var addVaga = new bootstrap.Modal(document.getElementById('modalAddVaga1'));
var addVaga2 = new bootstrap.Modal(document.getElementById('modalAddVaga2'));


adicionaVaga.addEventListener('click', function () {
    addVaga.show();

    document.getElementById('proximoVaga').addEventListener('click', function () {
        addVaga.hide();
        addVaga2.show();
        document.getElementById('voltarVaga').addEventListener('click', function () {
            addVaga2.hide();
            addVaga.show();
        })
        document.getElementById('salvarVaga').addEventListener('click', function (e) {
            e.preventDefault();
                if (document.getElementById('tituloVaga').value == "" || document.getElementById('emailContato').value == "" || document.getElementById('telefoneContato').value == "" 
                || document.getElementById('wppVaga').value == "" || document.getElementById('desejaveis').value == "" || document.getElementById('descricao').value == "" 
                || document.getElementById('requisitos').value == "" || document.getElementById('cuidados').value == "" || document.getElementById('beneficios').value == "" 
                || document.getElementById('site').value == "" || document.getElementById('salario').value == "" || document.getElementById('areaProfissional').value == "" 
                || document.getElementById('contratacao').value == "" || document.getElementById('periodo').value == ""  ){
                   msgErro(msgText = "Preencha todos os campos!!", color = "red");

            } else {
                cadastraVagas()
                addVaga2.hide();
            }

        })
    })
})


const nomeInput = document.querySelector('#nomeInput');
const emailInput = document.querySelector('#emailInput');
const telefoneInput = document.querySelector('#telInput');
const cnpjInput = document.querySelector('#cnpjInput');
const cepInput = document.querySelector('#cepInput');
const enderecoInput = document.querySelector('#enderecoInput');
const nInput = document.querySelector('#nInput');
const complementoInput = document.querySelector('#complementoInput');
const bairroInput = document.querySelector('#bairroInput');
const cidadeInput = document.querySelector('#cidadeInput');
const UfInput = document.querySelector('#UfInput');



nomeInput.value = nome
emailInput.value = email;
telefoneInput.value = telefone;
cnpjInput.value = cnpj;
cepInput.value = cep;
enderecoInput.value = endereco;
nInput.value = numero;
complementoInput.value = complemento;
bairroInput.value = bairro;
cidadeInput.value = cidade;
UfInput.value = uf;



function editaEmpresa() {
    axios.put('http://localhost:8080/api/empresa/editaempresa/' + payload.id, {
            id:payload.id,
            nome: nomeInput.value,
            email: emailInput.value,
            cnpj: cnpjInput.value,
            cep: cepInput.value,
            endereco: enderecoInput.value,
            numero: nInput.value,
            bairro: bairroInput.value,
            cidade: cidadeInput.value,
            uf: UfInput.value,
            telefone: telefoneInput.value,
            complemento: "",
            tipoUsuario: "EMPRESA",
            ativo: payload.ativo,
            aprova: payload.aprova,
            senha: payload.senha
        }, )
        .then(function (response) {
            console.log(response);
            location.reload();
            msgErro(msgText = "Editado com sucesso!!", color = "green");
        })
        .catch(function (error) {
            console.log(error);
        });



}

const desativaEmpresa = document.getElementById('desativaEmpresa')
const modalExcluir = new bootstrap.Modal(document.getElementById('modalDelUser'));
desativaEmpresa.addEventListener('click', function () {
    modalExcluir.show();
    document.getElementById('excuirUser').addEventListener('click', function () {
       axios.put('http://localhost:8080/api/empresa/desativar/' + payload.id)
        .then(function (response) {
            console.log(response);
            location.reload();
            window.location.replace('/../../../templates/login/login/login_empresa.html')
        })
        .catch(function (error) {
            console.log(error);
        });


       modalExcluir.hide();
    });
}
)
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

})
.catch(function (error) {
    console.log(error);
})