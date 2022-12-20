
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
 if (tipoUser == "empresa") {
   if(payload.ativo == false || payload.aprovado == false){
     window.location.replace('/../../../templates/login/login/login_empresa.html')
 
   
   }
 }
 
const userText = document.querySelector('.user-text');
const userLogado = payload.name;
userText.innerHTML = `Olá, ${userLogado.split(' ')[0]}`;


//paginas do user para o admin e do empresa
const user = document.getElementById('user');
const adm = document.getElementById('adm');
const empresa = document.getElementById('empresa');
const vaga = document.getElementById('vaga');
const usuariosListagem = document.getElementById('usuariosListagem');
const administradoresListagem = document.getElementById('administradoresListagem');
const empresasListagem = document.getElementById('empresasListagem');
const vagasListagem = document.getElementById('vagasListagem');
adm.addEventListener('click', function () {
    localLista = localStorage.setItem('lista', 'adm');
    user.classList.add('close');
    usuariosListagem.classList.add('close');
    administradoresListagem.classList.remove('close');
    adm.classList.remove('close');
    empresa.classList.add('close');
    empresasListagem.classList.add('close');
    vaga.classList.add('close');
    vagasListagem.classList.add('close');
})
user.addEventListener('click', function () {
    localLista = localStorage.setItem('lista', 'user');
    user.classList.remove('close');
    usuariosListagem.classList.remove('close');
    administradoresListagem.classList.add('close');
    adm.classList.add('close');
    empresa.classList.add('close');
    empresasListagem.classList.add('close');
    vaga.classList.add('close');
    vagasListagem.classList.add('close');
})
empresa.addEventListener('click', function () {
    localLista = localStorage.setItem('lista', 'empresa');
    user.classList.add('close');
    usuariosListagem.classList.add('close');
    administradoresListagem.classList.add('close');
    adm.classList.add('close');
    empresa.classList.remove('close');
    empresasListagem.classList.remove('close');
    vaga.classList.add('close');
    vagasListagem.classList.add('close');
})
vaga.addEventListener('click', function () {
    localLista = localStorage.setItem('lista', 'vaga');
    user.classList.add('close');
    usuariosListagem.classList.add('close');
    administradoresListagem.classList.add('close');
    adm.classList.add('close');
    empresa.classList.add('close');
    empresasListagem.classList.add('close');
    vaga.classList.remove('close');
    vagasListagem.classList.remove('close');
})
//metodo que verifica a lista que esta sendo exibida e a mantem a mesmo atualizando a pagina 
localLista = localStorage.getItem('lista');

if (localLista == 'user') {
    localLista = localStorage.setItem('lista', 'user');
    user.classList.remove('close');
    usuariosListagem.classList.remove('close');
    administradoresListagem.classList.add('close');
    adm.classList.add('close');
    empresa.classList.add('close');
    empresasListagem.classList.add('close');
    vaga.classList.add('close');
    vagasListagem.classList.add('close');
}
else if (localLista == 'adm') {
    localLista = localStorage.setItem('lista', 'adm');
    user.classList.add('close');
    usuariosListagem.classList.add('close');
    administradoresListagem.classList.remove('close');
    adm.classList.remove('close');
    empresa.classList.add('close');
    empresasListagem.classList.add('close');
    vaga.classList.add('close');
    vagasListagem.classList.add('close');
}
else if (localLista == 'empresa') {
    localLista = localStorage.setItem('lista', 'empresa');
    user.classList.add('close');
    usuariosListagem.classList.add('close');
    administradoresListagem.classList.add('close');
    adm.classList.add('close');
    empresa.classList.remove('close');
    empresasListagem.classList.remove('close');
    vaga.classList.add('close');
    vagasListagem.classList.add('close');
}
else if (localLista == 'vaga') {
    localLista = localStorage.setItem('lista', 'vaga');
    user.classList.add('close');
    usuariosListagem.classList.add('close');
    administradoresListagem.classList.add('close');
    adm.classList.add('close');
    empresa.classList.add('close');
    empresasListagem.classList.add('close');
    vaga.classList.remove('close');
    vagasListagem.classList.remove('close');
}



//================================================ Usuario ================================================= //
//função para criar a linha da tabela de user
function criarlinha(id, nome, email) {

    const tbody = document.querySelector('#bodyUser');
    let tr = document.createElement('tr');
    tr.id = id;
    let tdID = document.createElement('td');
    let tdNome = document.createElement('td');
    let tdEmail = document.createElement('td');
    let tdExcluir = document.createElement('td');
    let tdButton = document.createElement('button');

    //abre a modal de deletar
    var modalDelete = new bootstrap.Modal(document.querySelector('#deleteModal'));
    tdButton.addEventListener('click', function () {
        const deletConfirm = document.getElementById('deletConfirm');
        deletConfirm.innerHTML = `Excluir`;
        modalDelete.show(nome);
        const text = document.querySelector('#text');
        /*   text.innerHTML = `Deseja excluir o usuário ${nome}?`; */
        text.innerHTML = `<h4>Deseja mesmo excluir o usuário ${nome}?</h4>`;
        document.getElementById('deletConfirm').addEventListener('click', function () {
            deleteUser(id);
            modalDelete.hide();
        })
    })
    var cancel = document.querySelector('#cancelar');
    cancel.addEventListener('click', function () {
        modalDelete.hide();
    })

    tdID.innerHTML = id;
    tdNome.innerHTML = nome;
    tdEmail.innerHTML = email;
    tdButton.innerHTML = `<i class='bx bx-trash icon'></i>`;


    tbody.appendChild(tr);
    tr.appendChild(tdID);
    tr.appendChild(tdNome);
    tr.appendChild(tdEmail);
    tr.appendChild(tdExcluir);
    tdExcluir.appendChild(tdButton);

}

//Pega o usuario e chama a função para criar a linha da tabela
const url = "http://localhost:8080/api/usuario/";
function getUser() {
    axios.get(url, {
    })
        .then((response) => {
            const data = response.data;
            //popula a tabela com os dados do servidor
            data.map((data) => {
                nome = data.nome;
                id = data.id;
                email = data.email;
                criarlinha(id, nome, email);



            });
            $(document).ready(function () {
                $('#tableUser').DataTable({
                    "language": {
                        "lengthMenu": "Exibir _MENU_ por pagina",
                        "zeroRecords": "Nada encontrado - desculpe",
                        "info": "Mostrando pagina _PAGE_ de _PAGES_",
                        "infoEmpty": "No records available",
                        "infoFiltered": "(filtered from _MAX_ total records)",
                        "search": "Buscar:",
                        "paginate": {
                            "first": "First",
                            "last": "Last",
                            "next": "Proximo",
                            "previous": "Voltar"
                        }
                    }
                });
            });
        })
        .catch((error) => console.log(error));
}
getUser();

//função para deletar o usuario
const urlDel = "http://localhost:8080/api/usuario/excluir/";
function deleteUser(id) {
    axios.delete(urlDel + id, {

    })
        .then((response) => {
            const data = response.data;
            console.log(data);
            location.reload();
        })
        .catch((error) => console.log(error));
}



//================================================ Adminstrador ================================================= //




/* função de listagem de adm */
function criarlinhaAdm(id, nome, email, ativo) {
    const tbody = document.querySelector('#bodyAdm');
    let tr = document.createElement('tr');
    tr.id = id;
    let tdID = document.createElement('td');    
    let tdNome = document.createElement('td');
    let tdEmail = document.createElement('td');
    let tdExcluir = document.createElement('td');
    let tdButton = document.createElement('button');

    if (ativo == true) {
        tdButton.innerHTML = `<i class='bx bx-power-off'></i>`;
        
    }
    else {
        tdButton.innerHTML = `<i class='bx bx-power-off'></i>`;
        tdButton.style.opacity = "0.5";
    }
    //abre a modal de deletar
    var modalDelete = new bootstrap.Modal(document.querySelector('#deleteModal'));
    tdButton.addEventListener('click', function () {
        if (ativo == true) {
            tdButton.innerHTML = `<i class='bx bx-power-off'></i>`;
            document.getElementById('deletConfirm').innerHTML = "Desativar";
        }
        else {
            tdButton.innerHTML = `<i class='bx bx-power-off'></i>`;
            document.getElementById('deletConfirm').innerHTML = "Ativar";
            
        }
       

        modalDelete.show(nome);
        const text = document.querySelector('#text');
        /*   text.innerHTML = `Deseja excluir o usuário ${nome}?`; */
        text.innerHTML = `<h4>Deseja mesmo Desativar o usuário ${nome}?</h4>`;
        document.getElementById('deletConfirm').addEventListener('click', function () {

            if (ativo == true) {
                desativaAdm(id)
                location.reload();
          
            }
            else if (ativo == false) {
                ativaAdm(id)
                location.reload();
            }
            modalDelete.hide();
        })
    })
    var cancel = document.querySelector('#cancelar');
    cancel.addEventListener('click', function () {
        modalDelete.hide();
    })

    tdID.innerHTML = id;
    tdNome.innerHTML = nome;
    tdEmail.innerHTML = email;
    tdButton.innerHTML = `<i class='bx bx-power-off'></i>`;


    tbody.appendChild(tr);
    tr.appendChild(tdID);
    tr.appendChild(tdNome);
    tr.appendChild(tdEmail);
    tr.appendChild(tdExcluir);
    tdExcluir.appendChild(tdButton);

}
function getAdm() {
    /* localhost */
    axios.get("http://localhost:8080/api/adm", {

    })
        .then((response) => {
            const data = response.data;

            //popula a tabela com os dados do servidor
            data.map((data) => {
                nome = data.nome;
                id = data.id;
                email = data.email;

                criarlinhaAdm(id, nome, email, data.ativo);



            });

            $(document).ready(function () {
                $('#tableAdm').DataTable({
                    "language": {
                        "lengthMenu": "Exibir _MENU_ por pagina",
                        "zeroRecords": "Nada encontrado - desculpe",
                        "info": "Mostrando pagina _PAGE_ de _PAGES_",
                        "infoEmpty": "No records available",
                        "infoFiltered": "(filtered from _MAX_ total records)",
                        "search": "Buscar:",
                        "paginate": {
                            "first": "First",
                            "last": "Last",
                            "next": "Proximo",
                            "previous": "Voltar"
                        }
                    }
                });
            }); 
        })
        .catch((error) => console.log(error));
}
getAdm();
//função para deletar o adm

function ativaAdm(id) {
    axios.put("http://localhost:8080/api/adm/ativar/" + id)
        .then((response) => {
            const data = response.data;
            console.log(data);
            location.reload();})
     
     
            .catch((error) => console.log(error));
}

function desativaAdm(id) {
    axios.put("http://localhost:8080/api/adm/desativar/" + id)
        .then((response) => {
            const data = response.data;
            console.log(data);
            location.reload();
        })
        .catch((error) => console.log(error));
}





//================================================ Empresa ================================================= //

const closeModal = document.querySelectorAll('#closeModal')
var modalV = new bootstrap.Modal(document.getElementById("modalEmpresa"));
closeModal.forEach(close => {
    close.addEventListener("click", function () {
        modalV.hide()
    })
})


/* função de listagem de empresa */
function criarlinhaEmpresa(id, nome, cnpj, email, telefone, endereco, cidade, uf, cep, numero, bairro, ativo) {
    const tbody = document.querySelector('#bodyEmpresa');
    let tr = document.createElement('tr');

    let tdID = document.createElement('td');
    let tdNome = document.createElement('td');
    let tdCnpj = document.createElement('td');
    let tdVerMais = document.createElement('td');
    let tdExcluir = document.createElement('td');
    let verMais = document.createElement('button');
    verMais.style.backgroundColor = "#427AAA";

    let tdButton = document.createElement('button');

if (ativo == false) {   
        tdButton.style.opacity = "0.5";
}

    //abre a modal de deletar
    var modalDelete = new bootstrap.Modal(document.querySelector('#deleteModal'));
    tdButton.addEventListener('click', function () {
        if (ativo == true) {
            tdButton.innerHTML = `<i class='bx bx-power-off'></i>`;
    
            document.getElementById('deletConfirm').innerHTML = "Desativar";
        }
        else {
            tdButton.innerHTML = `<i class='bx bx-power-off'></i>`;
     
            document.getElementById('deletConfirm').innerHTML = "Ativar";
        }
       
        modalDelete.show(nome);
        const text = document.querySelector('#text');
        /*   text.innerHTML = `Deseja excluir o usuário ${nome}?`; */
        text.innerHTML = `<h4>Deseja mesmo Desativar o usuário ${nome}?</h4>`;
        document.getElementById('deletConfirm').addEventListener('click', function () {
            console.log(id);
            if (ativo == true) {
                desativaEmpresa(id); 
            }
            else if (ativo == false) {
                ativaEmpresa(id);
            }
          
            
            modalDelete.hide();
            location.reload();

        })
    })
    var cancel = document.querySelector('#cancelar');
    cancel.addEventListener('click', function () {
        modalDelete.hide();
    })

    tdID.innerHTML = id;
    tdNome.innerHTML = nome;
    tdCnpj.innerHTML = cnpj;
    verMais.innerHTML = `Ver mais`;
    tdButton.innerHTML = `<i class='bx bx-power-off'></i>`;

    tbody.appendChild(tr);
    tr.appendChild(tdID);
    tr.appendChild(tdNome);
    tr.appendChild(tdCnpj);
    tr.appendChild(tdVerMais);
    tr.appendChild(tdExcluir);

    tdVerMais.appendChild(verMais);
    tdExcluir.appendChild(tdButton);




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
                    <p>${cidade}-${uf}</p>
                    <p>${endereco}, ${bairro}, ${numero}, ${cep}</p>
                </span>
               

            </div>
            <div class="col-md-4 ms-auto">
            <span>
            <h4>CNPJ:</h4>
            <p>${cnpj}</p>
        </span>    
    <span>
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



}
function getEmpresa() {
    /* localhost */
    axios.get("http://localhost:8080/api/empresa", {

    })
        .then((response) => {
            const data = response.data;

            //popula a tabela com os dados do servidor
            data.map((data) => {
                nome = data.nome;
                id = data.id;
                email = data.email;
                telefone = data.telefone;
                cnpj = data.cnpj;
                endereco = data.endereco;
                cidade = data.cidade;
                uf = data.uf;
                cep = data.cep;
                numero = data.numero;
                bairro = data.bairro;
                ativo = data.ativo;

                if (data.aprova == true) {
                criarlinhaEmpresa(id, nome, cnpj, email, telefone, endereco, cidade, uf, cep, numero, bairro, ativo);
                }


            });
            //inicializa o datatable
            $(document).ready(function () {
                $('#tableEmpresa').DataTable({
                    "language": {
                        "lengthMenu": "Exibir _MENU_ por pagina",
                        "zeroRecords": "Nada encontrado - desculpe",
                        "info": "Mostrando pagina _PAGE_ de _PAGES_",
                        "infoEmpty": "No records available",
                        "infoFiltered": "(filtered from _MAX_ total records)",
                        "search": "Buscar:",
                        "paginate": {
                            "first": "First",
                            "last": "Last",
                            "next": "Proximo",
                            "previous": "Voltar"
                        }
                    }
                });
            });

        })
        .catch((error) => console.log(error));
}
getEmpresa();

function desativaEmpresa(id) {

    axios.put(`http://localhost:8080/api/empresa/desativar/${id}`)

        .then(function (response) {
            console.log(JSON.stringify(response.data));
            location.reload();
        })
        .catch(function (error) {
            console.log(error);
        });
}

function ativaEmpresa(id) {
    axios.put(`http://localhost:8080/api/empresa/ativar/${id}`)

        .then(function (response) {
            console.log(JSON.stringify(response.data));
            location.reload();
        })
        .catch(function (error) {
            console.log(error);
        });
}

//================================================ Vaga ================================================= //

/* função de listagem de vaga */

const closeModalVaga = document.querySelectorAll('#closeModalVaga')
var modalVaga = new bootstrap.Modal(document.getElementById("modalVaga"));
closeModalVaga.forEach(close => {
    close.addEventListener("click", function () {
        modalVaga.hide()
    })
})


function criarlinhaVaga(id, tituloVaga, emailContato, whatsapp, contato, requisitos, descricao, cuidados,  beneficios, site, salario, contratacao, periodo, ativo, areaProfissional, empresa, nomeEmpresa, cnpjEmpresa, emailEmpresa, telefoneEmpresa, enderecoEmpresa, cidadeEmpresa, ufEmpresa, cepEmpresa, numeroEmpresa, bairroEmpresa) {
    const tbody = document.querySelector('#bodyVaga');
    let tr = document.createElement('tr');
    tr.id = id;
    let tdID = document.createElement('td');
    let tdNome = document.createElement('td');
    let tdEmpresa = document.createElement('td');
    let tdVerMais = document.createElement('td');
    let tdExcluir = document.createElement('td');

    let verMais = document.createElement('button');
    verMais.style.backgroundColor = "#427AAA";
    let tdButton = document.createElement('button');

    //abre a modal de deletar
    var modalDelete = new bootstrap.Modal(document.querySelector('#deleteModal'));
    tdButton.addEventListener('click', function () {
        deletConfirm.innerHTML = "Excluir";
        modalDelete.show(nome);
        const text = document.querySelector('#text');
        /*   text.innerHTML = `Deseja excluir o usuário ${nome}?`; */
        text.innerHTML = `<h4>Deseja mesmo excluir o usuário ${nome}?</h4>`;
        document.getElementById('deletConfirm').addEventListener('click', function () {
            deleteVaga(id);
            modalDelete.hide();
        })
    })
    var cancel = document.querySelector('#cancelar');
    cancel.addEventListener('click', function () {
        modalDelete.hide();
    })

    tdID.innerHTML = id;
    tdNome.innerHTML = tituloVaga;
    tdEmpresa.innerHTML = nomeEmpresa;
    verMais.innerHTML = `Ver mais`;
    tdButton.innerHTML = `<i class='bx bx-trash icon'></i>`;


    tbody.appendChild(tr);
    tr.appendChild(tdID);
    tr.appendChild(tdNome);
    tr.appendChild(tdEmpresa);
    tr.appendChild(tdVerMais);
    tr.appendChild(tdExcluir);

    tdVerMais.appendChild(verMais);
    tdExcluir.appendChild(tdButton);

   const conteudoModal = document.querySelector('#modalBodyVaga');
    verMais.addEventListener('click', function () {
document.querySelector('#nomeVaga').innerText = `Nome da Vaga: ${tituloVaga}`;
        conteudoModal.innerHTML = `<div class="container-fluid">
        <div class="row">
            <div class="col-md-4">
            <span>
                    <h4>Empresa:</h4>
                    <p>${nomeEmpresa}</p>
                </span>    
            <span>
                    <h5>Local:</h5>
                    <p>${endereco}, ${numero}, ${bairro}, ${cep}, ${uf}</p>
                </span>
                <span>
                    <h5>Requisitos:</h5>
                    <ul> 
                    ${requisitos.split(",").map(requisito => `<li>${requisito}</li>`).join('')}
                    </ul>
                </span>
                <span>
                    <h5>Desejavel:</h5>
                    <ul>
                   
                    </ul>
                </span>
                <span>
                    <h5>Regime de Contratação:</h5>
                    <p>${contratacao}</p>
                </span>
               

            </div>
            <div class="col-md-4 ms-auto">
                <span>
                    <h5>Salario:</h5>
                    <p>${salario}</p>

                </span>
                <span>
                    <h5>Beneficios:</h5>
                    <ul>
                    ${beneficios.split(",").map(beneficio => `<li>${beneficio}</li>`).join('')}
                    </ul>
                </span>
                <span>
                    <h5>Periodo:</h5>
                    <p></p>
                </span>

                
                <span>
                <h5>Descriçao:</h5>
                <p>${descricao}</p>
            </span>
            </div>
           
        </div>
    </div>`
    modalVaga.show();
    })
   

}

function getVaga() {
    /* localhost */
    axios.get("http://localhost:8080/api/empresa/vaga", {

    })
        .then((response) => {
            const data = response.data;

            //popula a tabela com os dados do servidor
            data.map((data) => {
    
                criarlinhaVaga(data.id, data.tituloVaga, data.emailContato, data.whatsapp, data.contato, data.requisitos, data.descricao, data.cuidados, data.beneficios, data.site, data.salario, data.contratacao, data.periodo, data.ativo, data.areaProfissional,data.empresa, data.empresa.nome, data.empresa.cnpj, data.empresa.endereco, data.empresa.numero, data.empresa.bairro, data.empresa.cep, data.empresa.uf, data.empresa.cidade, data.empresa.telefone, data.empresa.email, data.empresa.site, data.empresa.ativo);

            });

            $(document).ready(function () {
                $('#tableVaga').DataTable({
                    "language": {
                        "lengthMenu": "Exibir _MENU_ por pagina",
                        "zeroRecords": "Nada encontrado - desculpe",
                        "info": "Mostrando pagina _PAGE_ de _PAGES_",
                        "infoEmpty": "No records available",
                        "infoFiltered": "(filtered from _MAX_ total records)",
                        "search": "Buscar:",
                        "paginate": {
                            "first": "First",
                            "last": "Last",
                            "next": "Proximo",
                            "previous": "Voltar"
                        }
                    }
                });
            });
        })
        .catch((error) => console.log(error));
}
getVaga();

function deleteVaga(id) {

    axios.delete(`http://localhost:8080/api/empresa/vaga/excluir/${id}`)
        .then((response) => {
            const data = response.data;
            console.log(data);
            location.reload();
        })
        .catch((error) => console.log(error));
}




//================================================ Menssagem de Sucesso/Erro ================================================= //
function msgErro(msgText, color) {

    div = document.createElement('div');
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
