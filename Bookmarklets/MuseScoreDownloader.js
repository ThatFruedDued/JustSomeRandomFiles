let xhr = new XMLHttpRequest();
let json;
xhr.onreadystatechange = function() {
  // 	Check if request is completed
  if (xhr.readyState == XMLHttpRequest.DONE) {
    //	Do what needs to be done here
    json = JSON.parse(xhr.response);
    getStatus();
  }
}

// Set the request URL and request method
xhr.open("POST", "https://api.convertio.co/convert");

// Set the `Content-Type` Request header
xhr.setRequestHeader("Content-Type", "application/json");

// Send the requst with Data
xhr.send('{"apikey": "4ddf29f4df5f856a5fb62441d0002398", "file":"' + document.getElementsByTagName("img")[0].src + '", "filename":"score.svg", "outputformat":"pdf"}');

function getStatus() {
  let secondJson;
  let secondXhr = new XMLHttpRequest();

  secondXhr.onreadystatechange = function() {
    // 	Check if request is completed
    if (secondXhr.readyState == XMLHttpRequest.DONE) {
      //	Do what needs to be done here
      secondJson = JSON.parse(secondXhr.response);
      if (secondJson.data.step == "finish") {
        var downloadElement = document.createElement("a");
        downloadElement.href = secondJson.data.output.url;
        downloadElement.download = "score.pdf";
        downloadElement.style.display = "none";
        document.body.appendChild(downloadElement);
        downloadElement.click();
      } else {
        getStatus();
      }
    }
  }
  secondXhr.open("GET", "https://api.convertio.co/convert/" + json.data.id + "/status");
  secondXhr.send();
}
