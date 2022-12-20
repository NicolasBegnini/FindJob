
   
   
/*   
    else{
  
    
       
}
});
 */

document.getElementById("entrar").addEventListener("click", function(event){

  event.preventDefault(event);

  if(document.getElementById("email").value == ""){
    event.preventDefault(event);
    msgErro(msgText = "Preencha o campo email!", color = "red");
  }
  else{
    event.preventDefault(event);
    var params = {
      email: document.getElementById("email").value
  
    };
    const serviceId = 'service_78e3oad';
    const templateId = 'template_ghq5y0u';
  
    emailjs
      .send(serviceId, templateId, params)
      .then((res) => {
          document.getElementById("email").value = "";
          alert("Email enviado com sucesso!");
   
          var email = document.getElementById("email").value;
          document.getElementById("emailtext").innerHTML = `Enviamos um email de verificação para o endereço: ${email}`;
        })
      
      .catch(function (err) {
  
        console.log('failed', err);
      }
      );
    }
  })
  



  
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