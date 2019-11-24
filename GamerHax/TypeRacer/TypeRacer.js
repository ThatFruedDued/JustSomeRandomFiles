function hacktivate(){
  var answers = document.getElementsByClassName("inputPanel")[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children;
  var completeFinish = answers[0].innerHTML + answers[1].innerHTML + answers[2].innerHTML + "";
  var inputArea = document.getElementsByClassName("txtInput")[0];
  inputArea.maxLength = 1000;
  inputArea.value = completeFinish;
}

var rrhb = document.createElement("BUTTON");
rrhb.innerHTML = "Activate Hack";
rrhb.position = "fixed";
rrhb.style.bottom = "20px";
rrhb.style.left = "30px";
rrhb.style.border = "none";
rrhb.style.outline = "none";
rrhb.style.backgroundColor = "black";
rrhb.style.color = "white";
rrhb.cursor = "pointer";
rrhb.padding = "15px";
rrhb.borderRadius = "10px";
rrhb.style.fontSize = "18px";

doument.body.appendChild(rrhb);

rrhb.addEventListener('mouseenter', e => {
  rrhb.style.backgroundColor = "#555";
});

rrhb.addEventListener('mouseleave', e => {
  rrhb.style.backgroundColor = "black";
});

rrhb.addEventListener('click', e => {
  hacktivate();
});
