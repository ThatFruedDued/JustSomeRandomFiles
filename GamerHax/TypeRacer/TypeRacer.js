setInterval(Update, 0);

function Update(){
  var captchaButton = document.getElementsByClassName("gwt-Button")[0];
  if(document.getElementsByClassName("xButton")[0] !== null){
     captchaButton = document.getElementsByClassName("xButton")[0];
  }
  if((captchaButton !== null) && (captchaButton !== undefined)){
    captchaButton.click();
  }
}

function hacktivate(){
  var answers = document.getElementsByClassName("inputPanel")[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children;
  var completeFinish = "";
  for(var i = 0; i < answers.length; i++){
    completeFinish = completeFinish + answers[i].innerHTML;
  }
  var inputArea = document.getElementsByClassName("txtInput")[0];
  inputArea.maxLength = 1000;
  inputArea.value = completeFinish;
}

var rrhb = document.createElement("BUTTON");
rrhb.innerHTML = "Activate Hack";
rrhb.style.position = "fixed";
rrhb.style.bottom = "10px";
rrhb.style.left = "15px";
rrhb.style.border = "none";
rrhb.style.outline = "none";
rrhb.style.backgroundColor = "black";
rrhb.style.color = "white";
rrhb.style.cursor = "pointer";
rrhb.style.padding = "15px";
rrhb.style.borderRadius = "5px";
rrhb.style.fontSize = "18px";

document.body.appendChild(rrhb);

rrhb.addEventListener('mouseenter', e => {
  rrhb.style.backgroundColor = "#555";
});

rrhb.addEventListener('mouseleave', e => {
  rrhb.style.backgroundColor = "black";
});

rrhb.addEventListener('click', e => {
  hacktivate();
});
