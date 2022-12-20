  var token = sessionStorage.getItem("token")
 
if (token == null) {
   window.location.replace('/../../../templates/login/login/login_adm.html')

  } 
 
function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

if(payload.ativo == false){
  window.location.replace('/../../../templates/login/login/login_adm.html')

}
