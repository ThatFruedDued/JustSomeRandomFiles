// Created by Frued Dued
// TypeRacer is not affiliated with this program
// Do not sell this program or pass it off as your own
// Have fun!

setInterval(Update, 0);

function Update(){
 if(acpubEnabled){
    acpub.innerHTML = "Automatically Close Popups";
    acpub.style.backgroundColor = "#00ba10";
    var captchaButton = document.getElementsByClassName("gwt-Button")[0];
    if((document.getElementsByClassName("xButton")[0] !== null) && (document.getElementsByClassName("xButton")[0] !== undefined)){
      captchaButton = document.getElementsByClassName("xButton")[0];
    }
    if((captchaButton !== null) && (captchaButton !== undefined)){
      captchaButton.click();
    }
  } else {
    acpub.innerHTML = "Keep Popups";
    acpub.style.backgroundColor = "#eb2300"
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
rrhb.style.bottom = "66px";
rrhb.style.left = "15px";
rrhb.style.border = "none";
rrhb.style.outline = "none";
rrhb.style.backgroundColor = "black";
rrhb.style.color = "white";
rrhb.style.cursor = "pointer";
rrhb.style.padding = "15px";
rrhb.style.borderRadius = "5px";
rrhb.style.fontSize = "18px";

var acpubEnabled = true;
var acpub = document.createElement("BUTTON");
acpub.innerHTML = "Automatically Close Popups";
acpub.style.position = "fixed";
acpub.style.bottom = "10px";
acpub.style.left = "15px";
acpub.style.border = "none";
acpub.style.outline = "none";
acpub.style.backgroundColor = "#00ba10";
acpub.style.color = "white";
acpub.style.cursor = "pointer";
acpub.style.padding = "15px";
acpub.style.borderRadius = "5px";
acpub.style.fontSize = "18px";

document.body.appendChild(acpub);
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

acpub.addEventListener('click', e => {
  acpubEnabled = !acpubEnabled;
});
