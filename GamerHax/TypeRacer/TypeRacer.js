function hacktivate(){
  var answers = document.getElementsByClassName("inputPanel")[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children;
  var completeFinish = answers[0].innerHTML + answers[1].innerHTML + answers[2].innerHTML + "";
  var inputArea = document.getElementsByClassName("txtInput")[0];
  inputArea.maxLength = 1000;
  inputArea.value = completeFinish;
}
hacktivate();
