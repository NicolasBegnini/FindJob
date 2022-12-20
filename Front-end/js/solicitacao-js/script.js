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
    if (payload.ativo == false) {
        window.location.replace('/../../../templates/login/login/login_adm.html')


    }
}
if (tipoUser == "empresa") {
    if (payload.ativo == false || payload.aprovado == false) {
        window.location.replace('/../../../templates/login/login/login_empresa.html')


    }
}

const userText = document.querySelector('.user-text');
const userLogado = payload.name;
userText.innerHTML = `Olá, ${userLogado.split(' ')[0]}`;





//Paginação das vagas
const clickVaga = document.getElementById('vaga');
const clickEmpresa = document.getElementById('empresa');
const cardVagas = document.getElementById('cardVagas');
const cardEmpresa = document.getElementById('cardEmpresa');


function abaEmpresa() {
    paginaEmpresa = localStorage.setItem('pagina', 'empresa');
    vaga.classList.add('close');
    cardVagas.classList.add('close');
    cardEmpresa.classList.remove('close');
    empresa.classList.remove('close');


}
clickEmpresa.addEventListener('click', function () {
    abaEmpresa();
})

function abaVaga() {
    paginaEmpresa = localStorage.setItem('pagina', 'vaga');
    vaga.classList.remove('close');
    cardVagas.classList.remove('close');
    cardEmpresa.classList.add('close');
    empresa.classList.add('close');
}
clickVaga.addEventListener('click', function () {
    abaVaga();

})
paginaEmpresa = localStorage.getItem('pagina');
if (paginaEmpresa == 'empresa') {
    abaEmpresa();
}
if (paginaEmpresa == 'vaga') {
    abaVaga();
}

const empresaSelect = document.getElementById('empresaSelect');
//Selecionando empresa
function criaOptionEmpresa(id, nomeEmpresa) {
    const optionEmpresa = document.createElement('option');
    optionEmpresa.setAttribute('value', id);
    optionEmpresa.innerHTML = nomeEmpresa;
    empresaSelect.appendChild(optionEmpresa);
}

function selecionaEmpresa() {
    axios.get(`http://localhost:8080/api/empresa/`)

        .then((response) => {
            console.log(JSON.stringify(response.data));
            data = response.data;


            data.forEach(empresa => {
                if (empresa.aprova == true) {
                    criaOptionEmpresa(empresa.id, empresa.nome, empresa.cnpj);
                } else {
                    console.log("Empresa inativa" + empresa.id);
                }
            });
        })

}

selecionaEmpresa();


const url = "http://localhost:8080/api/empresa/vaga";
const ItituloVaga = document.getElementById('tituloVaga');
const IemailContato = document.getElementById('emailContato');
const ItelefoneContato = document.getElementById('telefoneContato');
const Iwhatsapp = document.getElementById('wppVaga');
const Idesejaveis = document.getElementById('desejaveis');
const Idescricao = document.getElementById('descricao');
const Irequisitos = document.getElementById('requisitos');
const Icuidados = document.getElementById('cuidados');
const Ibeneficios = document.getElementById('beneficios');
const Isite = document.getElementById('site');
const Isalario = document.getElementById('salario');
const IareaProfissional = document.getElementById('areaProfissional');
const Icontratacao = document.getElementById('contratacao');
const Iperiodo = document.getElementById('periodo');


function cadastraVagas() {

    var opcaoTextoAreaProfissional = areaProfissional.options[areaProfissional.selectedIndex].text
    var opcaoTextoContratacao = contratacao.options[contratacao.selectedIndex].text;
    var opcaoTextoPeriodo = periodo.options[periodo.selectedIndex].text;
    var opcaoSelectID = empresaSelect.options[empresaSelect.selectedIndex].value;
    var opcaoSelectEmpresa = empresaSelect.options[empresaSelect.selectedIndex].text;
    axios.post(url, {

            tituloVaga: ItituloVaga.value,
            emailContato: IemailContato.value,
            whatsapp: Iwhatsapp.value,
            contato: ItelefoneContato.value,
            desejavel: Idesejaveis.value,
            descricao: Idescricao.value,
            requisitos: Irequisitos.value,
            cuidados: Icuidados.value,
            expiracao: "",
            publicacao: "",
            beneficios: Ibeneficios.value,
            site: Isite.value,
            salario: Isalario.value,
            contratacao: opcaoTextoContratacao,
            periodo: opcaoTextoPeriodo,
            ativo: true,
            areaProfissional: opcaoTextoAreaProfissional,
            empresa: {
                id: opcaoSelectID,
                nome: opcaoSelectEmpresa,
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


function getVagas() {
    axios.get(url)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            data = response.data;

            data.sort(function (b, a) {
                return a.id - b.id;
            });

            data.forEach(vaga => {
                if (vaga.ativo == false) {
                    criaVaga(vaga.id, vaga.tituloVaga, vaga.emailContato, vaga.contato, vaga.whatsapp, vaga.desejavel, vaga.descricao, vaga.requisitos, vaga.cuidados, vaga.expiracao, vaga.publicacao, vaga.beneficios,
                        vaga.site, vaga.salario, vaga.contratacao, vaga.periodo, vaga.ativo, vaga.areaProfissional, vaga.empresa.nome,vaga.empresa.email, vaga.empresa.cnpj, vaga.empresa.cep, vaga.empresa.endereco,
                        vaga.empresa.numero, vaga.empresa.complemento, vaga.empresa.bairro, vaga.empresa.cidade, vaga.empresa.uf);
                } else {
                    console.log("Vaga inativa" + vaga.id);
                }

            });


        })
        .catch((error) => {
            console.log(error);
        })

}

getVagas();



//Reprovação de vagas 
function deleteVaga(id) {
    const deleteVagar = 'http://localhost:8080/api/empresa/vaga/excluir/'
    axios.delete(deleteVagar + id)
        .then((response) => {
            const data = response.data;
            console.log(data);
        })
        .catch((error) => {
            console.log(error)
        });
}


//Aprovação de vagas
urlAtivaVaga = "http://localhost:8080/api/empresa/vaga/ativar/"

function aprovaVaga(id) {
    axios.put(urlAtivaVaga + id)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}



function vagaAprovada(empresa, emailContato) {
    var params = {
        name: empresa,
        email: emailContato,
        message: 'aprovada'
    };
    const serviceId = 'service_78e3oad';
    const templateId = 'template_qawj4km';

    emailjs.send(serviceId, templateId, params)
        .then((res) => {
            console.log('success', res.status);


        })
        .catch(function (err) {

            console.log('failed', err);
        });
}
function vagaReprovada(empresa, emailContato) {
    var params = {
        name: empresa,
        email: emailContato,
        message: 'recusada'
    };
    const serviceId = 'service_78e3oad';
    const templateId = 'template_qawj4km';

    emailjs.send(serviceId, templateId, params)
        .then((res) => {
            console.log('success', res.status);


        })
        .catch(function (err) {

            console.log('failed', err);
        });
}





const groupVagas = document.getElementById('vagasGroup');

//Paginação das vagas
function criaVaga(id, tituloVaga, emailContato, contato, whatsapp, desejavel, descricao, requisitos, cuidados, expiracao, publicacao, beneficios,
    site, salario, contratacao, periodo, ativo, areaProfissional, empresa,email_Empresa, cnpj, cep, endereco, numero, complemento, bairro, cidade, uf) {
    
    
        const sVaga = document.createElement('div');
    sVaga.classList.add('card-body');
    groupVagas.appendChild(sVaga);
    sVaga.innerHTML = `
<div class="vaga">
<div class="header-vaga">
    <div class="nome-vaga">
        <h4>${tituloVaga}</h4>
    </div>
</div>
<div class="body-vaga">
    <div class="descricao">
        <h5>Descrição:</h5>
        <p>${descricao}</p>
    </div>
    </div>
</div>
`
    const footerVaga = document.createElement('div')
    footerVaga.classList.add('footer-vaga')
    sVaga.appendChild(footerVaga)

    const divVerMais = document.createElement('div')
    divVerMais.classList.add('btn-verMais')
    footerVaga.appendChild(divVerMais)

    const verMais = document.createElement("button")
    verMais.classList.add('btn');
    verMais.classList.add('btn-primary');
    verMais.classList.add('btn-verMais');
    verMais.innerHTML = 'Ver Mais..';
    divVerMais.appendChild(verMais)



    const divbButton = document.createElement('div')
    divbButton.classList.add("button")
    footerVaga.appendChild(divbButton)

    const divAprovar = document.createElement('div')
    divAprovar.classList.add("btn-aceitar")
    divbButton.appendChild(divAprovar)

    const btnAprovar = document.createElement('button')
    btnAprovar.classList.add('btn')
    btnAprovar.classList.add('btn-success')
    btnAprovar.innerHTML = "Aprovar"
    divAprovar.appendChild(btnAprovar)
    btnAprovar.addEventListener('click', function () {

        aprovaVaga(id);
        console.log(id);
        vagaAprovada(empresa, email_Empresa)
        sVaga.style.display = "none";
        setTimeout(() => {
            location.reload();
        }, 4000);
       

    })

    const divRecusar = document.createElement('div')
    divRecusar.classList.add("btn-recusar")
    divbButton.appendChild(divRecusar)

    const btnRecusar = document.createElement('button')
    btnRecusar.classList.add('btn')
    btnRecusar.classList.add('btn-danger')
    btnRecusar.innerHTML = "Recusar"
    divRecusar.appendChild(btnRecusar)

    btnRecusar.addEventListener('click', function () {
        console.log(id)
        deleteVaga(id)
        vagaReprovada(empresa, email_Empresa)
        sVaga.style.display = "none";
        setTimeout(() => {
            location.reload();
        }, 4000);

    })


    const closeModal = document.querySelectorAll('#closeModal')
    var modalV = new bootstrap.Modal(document.getElementById("modalVaga"));
    const nomeVaga = document.querySelector('#nomeVaga').innerHTML = tituloVaga;
    const conteudoModal = document.querySelector('#modalBody');


    verMais.addEventListener("click", function () {

        conteudoModal.innerHTML = `<div class="container-fluid">
        <div class="row">
            <div class="col-md-4">
            <span>
                    <h4>Empresa:</h4>
                    <p>${empresa}</p>
                    <p>${cnpj}</p>
                    </span>    
                <span>
                    <h5>Requisitos:</h5>
                    
                    ${requisitos.split(",").map(requisito => `<li>${requisito}</li>`).join('')}
                    
                </span>
                <span>
                    <h5>Desejavel:</h5>
                    ${desejavel.split(",").map(desejaveis => `<li>${desejaveis}</li>`).join('')}
                </span>
                <span>
                    <h5>Regime de Contratação:</h5>
                    <p>${contratacao}</p>
                    
                </span>
                <span class="descricao">
            <h5>Descriçao:</h5>
            <p>${descricao}</p>
        </span>
               
            </div>
            <div class="col-md-4 ms-auto" >
            <span>
            <h5>Local:</h5>
          <p>${endereco}, ${numero} - ${complemento}</p>
            <p>${bairro} - ${cidade} - ${uf}</p>
            <p>${cep}</p>   
        </span>
                <span>
                    <h5>Salario:</h5>
                    <p>${salario}R$</p>

                </span>
                <span>
                    <h5>Beneficios:</h5>
                 
                    ${beneficios.split(",").map(beneficio => `<li>${beneficio}</li>`).join('')}
                   
                </span>
                <span>
                    <h5>Periodo:</h5>
                    <p>${periodo}</p>
                </span>
                <span>
                <h5>Area Profissional:</h5>
                <p>${areaProfissional}</p>
                
            </span>
              
           
            </div>
             
        </div>
    </div>`
        modalV.show()
    })




    closeModal.forEach(close => {
        close.addEventListener("click", function () {
            modalV.hide()
        })
    })
    /* 
        const aceitar = document.getElementById("aceitar")
        aceitar.addEventListener("click", function () {
        }) */
}


const adicionaVaga = document.querySelectorAll('#adiconaVaga')

var addVaga = new bootstrap.Modal(document.getElementById('modalAddVaga1'));
var addVaga2 = new bootstrap.Modal(document.getElementById('modalAddVaga2'));

adicionaVaga.forEach(function (adicionaVaga) {
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
                if (ItituloVaga.value == "" || IemailContato.value == "" || ItelefoneContato.value == "" || Iwhatsapp.value == "" || Idesejaveis.value == "" || Idescricao.value == "" || Irequisitos.value == "" || Icuidados.value == "" || Ibeneficios.value == "" || Isite.value == "" ||
                    Isalario.value == "" || IareaProfissional.value == "" || Icontratacao.value == "" || Iperiodo.value == "") {
                    msgErro("Preencha todos os campos", "red")
                } else {
                    cadastraVagas()
                    addVaga2.hide();

                }

            })
        })
    })
})






//================================================================ Empresa ==============================================================================================//


const InomeEmpresa = document.getElementById('nomeEmpresa');
const IemailEmpresa = document.getElementById('emailEmpresa');
const ItelEmpresa = document.getElementById('telEmpresa');
const IcnpjEmpresa = document.getElementById('cnpjEmpresa');
const IcepEmpresa = document.getElementById('cepEmpresa')
const Iendereco = document.getElementById('ruaEmpresa')
const IcidadeEmpresa = document.getElementById('cidadeEmpresa')
const IbairroEmpresa = document.getElementById('bairroEmpresa')
const IufEmpresa = document.getElementById('ufEmpresa')
const InEmpresa = document.getElementById('nEmpresa')
const IsenhaEmpresa = document.getElementById('senhaEmpresa');
const IconfSenhaEmpresa = document.getElementById('confSenhaEmpresa');
const salvarEmpresa = document.getElementById('salvarEmpresa');



urlEmpresa = 'http://localhost:8080/api/empresa'

function cadEmpresa() {

    axios.post(urlEmpresa, {
            nome: InomeEmpresa.value,
            cnpj: IcnpjEmpresa.value,
            email: IemailEmpresa.value,
            telefone: ItelEmpresa.value,
            endereco: Iendereco.value,
            cidade: IcidadeEmpresa.value,
            uf: IufEmpresa.value,
            cep: IcepEmpresa.value,
            numero: InEmpresa.value,
            bairro: IbairroEmpresa.value,
            senha: IsenhaEmpresa.value,
            tipoUsuario: "EMPRESA",
            ativo: true,
            aprova: true




        })
        .then((response) => {
            console.log(JSON.stringify(response.data));
            location.reload();

        })
        .catch((error) => {
            console.log(error)

        });


}

const adiconaEmpresa = document.querySelectorAll('#adiconaEmpresa')

var addEmpresa = new bootstrap.Modal(document.getElementById('modalAddEmpresa1'));
var addEmpresa2 = new bootstrap.Modal(document.getElementById('modalAddEmpresa2'));

adiconaEmpresa.forEach(function (adiconaEmpresa) {
    adiconaEmpresa.addEventListener('click', function () {
        addEmpresa.show();

        document.getElementById('proximoEmpresa').addEventListener('click', function () {
            addEmpresa.hide();
            addEmpresa2.show();
            document.getElementById('salvarEmpresa').addEventListener('click', function (event) {
                event.preventDefault()
                if (InomeEmpresa.value == "" || IemailEmpresa.value == "" || ItelEmpresa.value == "" || IcnpjEmpresa.value == "" || IcepEmpresa.value == "" || Iendereco.value == "" || IcidadeEmpresa.value == "" || IbairroEmpresa.value == "" || IufEmpresa.value == "" || InEmpresa.value == "" || IsenhaEmpresa.value == "" || IconfSenhaEmpresa.value == "") {
                    msgErro("Preencha todos os campos", "red")
                } else if (IsenhaEmpresa.value != IconfSenhaEmpresa.value) {
                    msgErro("Senhas não conferem", "red")
                } else {
                    cadEmpresa()
                    addEmpresa2.hide();
                }
            })
            document.getElementById('voltarEmpresa').addEventListener('click', function () {
                addEmpresa2.hide();
                addEmpresa.show();
            })
        })
    })
})


const closeModal = document.querySelectorAll('#closeModal')
var modalV = new bootstrap.Modal(document.getElementById("modalVaga"));
closeModal.forEach(close => {
    close.addEventListener("click", function () {
        modalV.hide()
    })
})



urlEmpresa = "http://localhost:8080/api/empresa/"

function getEmpresa() {
    axios.get(urlEmpresa)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            data = response.data;

            data.sort(function (b, a) {
                return a.id - b.id;
            });

            data.forEach(empresa => {
                if (empresa.aprova == false) {

                    criaEmpresa(empresa.id, empresa.nome, empresa.cnpj, empresa.email, empresa.telefone, empresa.endereco, empresa.cidade, empresa.uf, empresa.cep, empresa.numero, empresa.bairro)
                } else {
                    console.log("Empresa ativa")
                }

            });

        })
        .catch((error) => {
            console.log(error);
        })

}

getEmpresa();


function aprovaEmpresa(id) {
    urlAprovaEmpresa = "http://localhost:8080/api/empresa/aprovar/"
    axios.put(urlAprovaEmpresa + id, {

        })
        .then((response) => {
            console.log(JSON.stringify(response.data));
            location.reload();

        })
        .catch((error) => {
            console.log(error);
        })
}



function criaEmpresa(id, nome, cnpj, email, telefone, endereco, cidade, uf, cep, numero, bairro) {
    urlEmpresa = "http://localhost:8080/api/empresa/"
    axios.put(urlEmpresa + id, {
            id: id,
            nome: nome,
            email: email,
            telefone: telefone,
            cnpj: cnpj,
            endereco: endereco,
            cidade: cidade,
            uf: uf,
            cep: cep,
            numero: numero,
            bairro: bairro,
            ativo: true

        })
        .then((response) => {
            console.log(JSON.stringify(response.data));
            location.reload();

            abaEmpresa();
        })
        .catch((error) => {
            console.log(error);
        })
}



function reprovaEmpresa(id) {
    urlReprovaEmpresa = "http://localhost:8080/api/empresa/excluir/"
    axios.delete(urlReprovaEmpresa + id)

        .then((response) => {
            console.log(JSON.stringify(response.data));
            location.reload();

        })
        .catch((error) => {
            console.log(error);
        })
}
const groupEmpresa = document.getElementById('empresaGroup')

function criaEmpresa(id, nome, cnpj, email, telefone, endereco, cidade, uf, cep, numero, bairro) {
    const sEmpresa = document.createElement('div');
    sEmpresa.classList.add('card-body');
    groupEmpresa.appendChild(sEmpresa);

    sEmpresa.innerHTML = `
    <div class="empresa">
    <div class="header-empresa">
        <div class="nome-empresa">
            <h4>${nome}</h4>
        </div>
        <div class="cnpj">
            <h4>CNPJ: ${cnpj}</h4>
        </div>
       

</div>
<div class="body-vaga"></div>
`
    const footerEmpresa = document.createElement('div')
    footerEmpresa.classList.add('footer-empresa')
    sEmpresa.appendChild(footerEmpresa)

    const divVerMais = document.createElement('div')
    divVerMais.classList.add('btn-verMais')
    footerEmpresa.appendChild(divVerMais)

    const verMais = document.createElement("button")
    verMais.classList.add('btn');
    verMais.classList.add('btn-primary');
    verMais.classList.add('btn-verMais');
    verMais.innerHTML = 'Ver Mais..';
    divVerMais.appendChild(verMais)



    const divbButton = document.createElement('div')
    divbButton.classList.add("button")
    footerEmpresa.appendChild(divbButton)

    const divAprovar = document.createElement('div')
    divAprovar.classList.add("btn-aceitar")
    divbButton.appendChild(divAprovar)

    const btnAprovar = document.createElement('button')
    btnAprovar.classList.add('btn')
    btnAprovar.classList.add('btn-success')
    btnAprovar.innerHTML = "Aprovar"
    divAprovar.appendChild(btnAprovar)
    btnAprovar.addEventListener('click', function () {
        aprovaEmpresa(id)
        location.reload();
        console.log(id);


    })

    const divRecusar = document.createElement('div')
    divRecusar.classList.add("btn-recusar")
    divbButton.appendChild(divRecusar)

    const btnRecusar = document.createElement('button')
    btnRecusar.classList.add('btn')
    btnRecusar.classList.add('btn-danger')
    btnRecusar.innerHTML = "Recusar"
    divRecusar.appendChild(btnRecusar)

    btnRecusar.addEventListener('click', function () {
        reprovaEmpresa(id)
        location.reload();
        console.log(id)


    })


    const conteudoModal = document.querySelector('#modalBody');


    verMais.addEventListener("click", function () {

        conteudoModal.innerHTML = `<div class="container-fluid">
        <div class="row">
            <div class="col-md-4">
            <span>
                    <h4>Empresa:</h4>
                    <p>${nome}</p>
                </span>    
            <span>
                    <h5>Local:</h5>
                    <p>${endereco}, ${bairro}, ${numero}, ${cep}</p>
                </span>
               

            </div>
            <div class="col-md-4 ms-auto">
                <span>
                    <h5>Email:</h5>
                    <p>${email}</p>

                </span>
                <span>
                    <h5>Telefone:</h5>
                    <p>${telefone}</p>
                </span>
              
            </div>
           
        </div>
    </div>`
        modalV.show()

    })


















    //=========================================================== Menssagem de erro =============================================================================//


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


function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('ruaEmpresa').value = ("");
    document.getElementById('bairroEmpresa').value = ("");
    document.getElementById('cidadeEmpresa').value = ("");
    document.getElementById('ufEmpresa').value = ("");
}



function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('ruaEmpresa').value = (conteudo.logradouro);
        document.getElementById('bairroEmpresa').value = (conteudo.bairro);
        document.getElementById('cidadeEmpresa').value = (conteudo.localidade);
        document.getElementById('ufEmpresa').value = (conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}



function pesquisacep(valor) {



    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');



    //Verifica se campo cep possui valor informado.
    if (cep != "") {



        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;



        //Valida o formato do CEP.
        if (validacep.test(cep)) {



            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('ruaEmpresa').value = "...";
            document.getElementById('bairroEmpresa').value = "...";
            document.getElementById('cidadeEmpresa').value = "...";
            document.getElementById('ufEmpresa').value = "...";



            //Cria um elemento javascript.
            var script = document.createElement('script');



            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';



            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);



        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }



};




// Formatar Salário



function formatarMoeda() {
    var elemento = document.getElementById('salario');
    var valor = elemento.value;



    valor = valor + '';
    valor = parseInt(valor.replace(/[\D]+/g, ''));
    valor = valor + '';
    valor = valor.replace(/([0-9]{2})$/g, ",$1");



    if (valor.length > 6) {
        valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }



    elemento.value = valor;
    if (valor == 'NaN') elemento.value = '';
}




// Formatar Telefone



function mask(o, f) {
    setTimeout(function () {
        var v = mphone(o.value);
        if (v != o.value) {
            o.value = v;
        }
    }, 1);
}

function mphone(v) {
    var r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 10) {
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 5) {
        r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
        r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
        r = r.replace(/^(\d*)/, "($1");
    }
    return r;
}




// Formatar Dia



const dataPublicacao = document.getElementById('publicacao');
const dataExpiracao = document.getElementById('expiracao');



dataExpiracao.min = new Date().toISOString().split("T")[0];
dataPublicacao.min = new Date().toISOString().split("T")[0];






// JavaScript para que o input text receba apenas números



function onlynumber(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    //var regex = /^[0-9.,]+$/;
    var regex = /^[0-9.]+$/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}