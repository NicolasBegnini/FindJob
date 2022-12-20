
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



console.log(tipoUser);
const userText = document.querySelector('.user-text');
const userLogado = payload.name;
userText.innerHTML = `Olá, ${userLogado.split(' ')[0]}`;



const buscar = document.getElementById('buscar');

const getSearchedTodos = (search) => {
  const todos = document.querySelectorAll(".div");

  todos.forEach((todo) => {
    const todoTitle = todo.querySelector("h3").innerText.toLowerCase();

    todo.style.display = "flex";

    console.log(todoTitle);

    if (!todoTitle.includes(search)) {
      todo.style.display = "none";
    }
  });
};


buscar.addEventListener("keyup", (e) => {
  const search = e.target.value;

  getSearchedTodos(search);
});


const adiconaVaga = document.getElementById('adiconaVaga');

var addVaga = new bootstrap.Modal(document.getElementById('modalAddVaga1'));
var addVaga2 = new bootstrap.Modal(document.getElementById('modalAddVaga2'));

adiconaVaga.addEventListener('click', function () {
  addVaga.show();

  document.getElementById('proximoVaga').addEventListener('click', function () {
    addVaga.hide();
    addVaga2.show();
    document.getElementById('salvarVaga').addEventListener('click', function () {
      addVaga2.hide();
      /*      criaVaga(); */
    })
  })
})




function getVagas() {
  axios.get('http://localhost:8080/api/empresa/vaga')
    .then((response) => {
      console.log(JSON.stringify(response.data));
      data = response.data;

      data.sort(function (b, a) {
        return a.id - b.id;
      });


      data.forEach(vaga => {
        if (vaga.ativo == true) {
          criaVaga(vaga.id, vaga.tituloVaga, vaga.emailContato, vaga.contato, vaga.whatsapp, vaga.desejavel, vaga.descricao, vaga.requisitos, vaga.cuidados, vaga.expiracao, vaga.publicacao, vaga.beneficios, vaga.site, vaga.salario, vaga.contratacao, vaga.periodo, vaga.ativo,vaga.areaProfissional, vaga.empresa.id, vaga.empresa.nome, vaga.empresa.cnpj, vaga.empresa.email, vaga.empresa.telefone, vaga.empresa.whatsapp, vaga.empresa.site, vaga.empresa.endereco,vaga.empresa.numero, vaga.empresa.complemento,vaga.empresa.bairro, vaga.empresa.cidade, vaga.empresa.uf, vaga.empresa.cep, vaga.empresa.ativo);
        }

      });
    

      const aba = document.querySelectorAll('.aba');

      document.addEventListener('click', function (e) {
        const el = e.target;
        const parentEl = el.closest('div');

        if (el.classList.contains('contats')) {
          parentEl.classList.toggle('close');

        }

      });
    }
    )
    .catch((error) => {
      console.log(error);
    })

}



getVagas();


//função para criar vaga
function criaVaga(id, tituloVaga, emailContato, contato, whatsapp, desejavel, descricao, requisitos, cuidados, expiracao, publicacao, beneficios, site, salario, contratacao, periodo, ativo,areaProfissional, idEmpresa, nome, cnpj, email, telefone, whatsappEmpresa, siteEmpresa, endereco, numero, complemento, bairro, cidade, uf, cep, ativoEmpresa) {


  const principal = document.querySelector('.principal');
  const div = document.createElement('div');
  div.classList.add('div');
  div.innerHTML = `
    <div class="vaga">
        <h3>${tituloVaga}</h3>
    </div>
    <div class="empresa">
        <h4>${nome}</h4>
    </div>
    <div class="r">
    <div class="local">
        <h6>Local:</h6>
        <p>${endereco}, ${numero}, ${bairro}, ${cep}, ${uf}</p>
    </div>
    </div>
    <div class="requisitos">
        <h6>Requisitos:</h6>
        <ul>
       ${requisitos.split(",").map(requisito => `<li>${requisito}</li>`).join('')}
        </ul>
    </div>`;


  /* ${requisitos.map(requisito => `<li>${requisito}</li>`).join('')} */
  button = document.createElement('button');
  button.classList.add('btn');
  button.classList.add('btn-primary');
  button.classList.add('bVerMais');
  button.innerHTML = 'Ver Mais..';

  div.appendChild(button);
  button.addEventListener('click', function () {

    var modal = new bootstrap.Modal(document.querySelector('#modalVaga'));
    modal.show();

    const conteudoModal = document.querySelector('#modalBody');

    document.getElementById("pdf").addEventListener("click", function () {
      var imgData =
        "data:image/png;base64,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";

      var doc = new jsPDF();
      /* var imgData = "../../img/logo_principal.png" */

      var width = doc.internal.pageSize.getWidth();

      doc.addImage(imgData, "JPEG", 05, 05, 20, 20);

      doc.setDrawColor(66, 122, 170); // draw red lines
      doc.setLineWidth(4);

      doc.line(1000, 2, 0, 2); // horizontal line

      doc.line(1000, 295, 0, 295);

      doc.line(208, 2000, 208, 0); // vertical line

      doc.line(2, 2000, 2, 0); // vertical line

      doc.setTextColor(237, 122, 17);
      doc.setFontSize(22);
      doc.text(`${tituloVaga}`, width / 2, 30, { align: "center" });

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(15);
      doc.text(
        `
  Meios de contato:`,
        10,
        50
      );

      doc.setTextColor(143, 143, 143);
      doc.setFontSize(12);
      doc.text(
        `
  E-mail:                                                
  ${emailContato}                                        
  
  Contato:    
  ${contato}

  WhatsApp:
  ${whatsapp}`,
        11.5,
        62
      );

      ////////////////////////////////////////////////////////////////

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(15);
      doc.text(
        `
  Sobre a vaga:`,
        10,
        115
      );

      doc.setTextColor(143, 143, 143);
      doc.setFontSize(12);
      doc.text(
        `                  
  Descrição da vaga:    
  ${descricao}

  Requisitos:
  ${requisitos}

  Desejáveis:                                                
  ${desejavel}       
  
  Benefícios:
  ${beneficios}

  Salário da vaga:
  R$${salario}

  Regime de contratação:
  ${contratacao}

  Período de trabalho:
  ${periodo}
  
  `,
        11.5,
        127
      );

      doc.save(`Vaga_${tituloVaga}.pdf`);
      /*   doc.addImage(imgData, 'JPEG', 15, 40, 180, 180); */
    });

    document.getElementById('close').addEventListener('click', function () {
      modal.hide();
    })
    document.querySelector('.btn-close').addEventListener('click', function () {
      modal.hide();
    })
    const contatos = document.getElementById('contatos')

    var modalcontato = new bootstrap.Modal(document.querySelector('#modalContato'));

    document.getElementById('contatos').addEventListener('click', function () {
      modal.hide()
      modalcontato.show()
      document.getElementById('closeContato').addEventListener('click', function () {
        modalcontato.hide()
            
        setTimeout(function () {
        location.reload()
        }, 1000); 
      })

    })
    const conteudoContato = document.getElementById('conteudoContato');

    conteudoContato.innerHTML = `
    <div class="row g-1" >
    <div class="col-md-12">
        <label for="inputDate4" class="form-label">Contato:</label>
        <p>${contato}</p>
    </div>
    <div class="col-md-12">
    <label for="inputDate4" class="form-label">Whatsapp:</label>
    <p>${whatsapp}</p>
    </div>
<div class="col-md-12">
<label for="inputDate4" class="form-label">E-mail:</label>
<p>${emailContato}</p>

</div>
    </div>`


  document.getElementById('nomeVaga').innerHTML = tituloVaga;

    conteudoModal.innerHTML = `<div class="container-fluid">
        <div class="row">
            <div class="col-md-4">
            <span>
                    <h4>Empresa:</h4>
                    <p>${nome}</p>
                </span>    
            <span>
                    <h5>Local:</h5>
                    <p>${endereco}, ${numero}, ${bairro}, ${cep}, ${uf}</p>
                </span>
                <span>
                    <h5 >Requisitos:</h5>
                    <ul> 
                    ${requisitos.split(",").map(requisito => `<li>${requisito}</li>`).join('')}
                    </ul>
                </span>
                <span id="spanDesejavel">
                    <h5>Desejável:</h5>
                    <ul>
                    ${desejavel.split(",").map(desejavel => `<li>${desejavel}</li>`).join('')}
                    </ul>
                </span>
                <span>
                    <h5>Regime de Contratação:</h5>
                    <p>${contratacao}</p>
                </span>
               

            </div>
            <div class="col-md-4 ms-auto">

            <span>
                <h5>Descriçao:</h5>
                <p>${areaProfissional}</p>
            </span>
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
                    <p>${periodo}</p>
                </span>

                
                <span>
                <h5>Descriçao:</h5>
                <p>${descricao}</p>
            </span>
            </div>
           
        </div>
    </div>`
  
   })
  //função para abrir a aba da contatos


  principal.appendChild(div);
  const div2 = document.createElement('div');
  div2.classList.add('aba');
  div2.innerHTML = `
    <i class='bx bx-chevron-left contats ' ></i>
  <div class="contatos ">
    <h4>Entre em contato conosco:</h4>
    <span id="copia-contato">
        <label>Contato</label>
        <p id="copy-c">${contato}</p>
        
    </span>
    <span>
        <label>Whatsapp</label>
        <p>${whatsapp}</p>
        
    </span>
    <span>
        <label>E-mail</label>
        <p>${emailContato}</p>
        
    </span>
</div>`

  div.appendChild(div2);

  /*   const copy = document.querySelector('#copy-c');
    copy.select();
      document.execCommand('copy');
      alert('Copiado com sucesso!');
    const btnContato = document.getElementById('#copia-contato');
    btnContato.addEventListener('click', function () {
        alert("Contato copiado com sucesso!");
      
  
    })  */

  /* div.forEach((div) => {
    div.addEventListener('click', (e) => {
  
  
    })
  });
  
   */



  /*modal para criar vagas  */





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


