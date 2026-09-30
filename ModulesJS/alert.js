let toastBox = document.getElementById('toastBox');
let successMsg = '<i class="fa-solid fa-circle-check"></i> Mensaje enviado Exitosamente!';
let errorMsg = '<i class="fa-solid fa-circle-xmark"></i> Message no enviado. Intentalo de nuevo!!'
let invalidMsg = '<i class="fa-solid fa-circle-exclamation"></i> Mensaje invalido';

function showToast(msg){
  let toast = document.createElement('div');
  toast.classList.add('toast');
  toast.innerHTML = msg;
  toastBox.appendChild(toast);
  
  if(msg.includes('xmark')){
    toast.classList.add('error');
  }
  if(msg.includes('Invalid')){
    toast.classList.add('invalid');
  }

  setTimeout(() => {
    toast.remove();
  }, 6000);
} 
