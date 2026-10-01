(function() {
  emailjs.init('WfqQfI6s1NJIuDhf3');
const form = document.querySelector("form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");

const btn = document.getElementById('button');


function checkInputs(){
  const items = document.querySelectorAll(".item");

   for(const item of items){
     if(item.value  == ""){
       item.classList.add("error");
       item.parentElement.classList.add("error");
     }

     if(items[1].value != ""){
      checkEmail();
     }

     items[1].addEventListener("keyup", () => {
      checkEmail();
     });

      item.addEventListener("keyup", () => {
        if(item.value != ""){
          item.classList.remove("error");
          item.parentElement.classList.remove("error");
        }
        else{
          item.classList.add("error");
          item.parentElement.classList.add("error");
        }
      });
    }
}

function checkEmail(){
  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
  const errorTxtEmail = document.querySelector(".error-text.email");

  if(!email.value.match(emailRegex)){
    email.classList.add("error");
    email.parentElement.classList.add("error");

    if(email.value != ""){
      errorTxtEmail.innerText = "Enter a valid email address";
    }
    else{
      errorTxtEmail.innerText = "Email Address can't be blank";
    }
  }
  else{
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
  }
}

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();
   checkInputs(); 

   if(!name.classList.contains("error") && !email.classList.contains("error") && !subject.classList.contains("error") && !mess.classList.contains("error")){
    btn.value = 'Enviando...';

    const serviceID = 'default_service';
    const templateID = 'template_s9kij45';

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Enviar Mensaje';
        showToast(successMsg);
        // alert('Mensaje enviado correctamente');
      }, (err) => {
        btn.value = 'Enviar Mensaje';
        showToast(errorMsg);
        alert(JSON.stringify(err));
      });
    form.reset();
    return false;
  }
});

})();