var token = sessionStorage.getItem("token")
 
if (token == null) {
   window.location.replace('/../../../templates/login/login/login_user.html')

  } 
