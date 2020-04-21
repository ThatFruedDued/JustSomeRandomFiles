let apiKey;
try {
  apiKey = localStorage.getItem("apikey");
  if (apiKey == null || apiKey == undefined || apiKey == "" || apiKey == "null") {
    apiKey = prompt("Paste API key (or get one at https://developers.convertio.co/)");
    localStorage.setItem("apikey", apiKey);
  }
} catch(err) {
  apiKey = prompt("Paste API key (or get one at https://developers.convertio.co/)");
  localStorage.setItem("apikey", apiKey);
}

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
xhr.send('{"apikey": "' + apiKey + '", "input":"base64", "file":"' + document.getElementsByClassName("no-attribution")[0].style.backgroundImage.split('base64,')[1].split('")')[0] + '", "filename":"icon.svg", "outputformat":"png"}');

function getStatus() {
  let secondJson;
  let secondXhr = new XMLHttpRequest();

  secondXhr.onreadystatechange = function() {
    // 	Check if request is completed
    if (secondXhr.readyState == XMLHttpRequest.DONE) {
      //	Do what needs to be done here
      secondJson = JSON.parse(secondXhr.response);
      if (secondJson.data.step == "finish") {
        let downloadElement = document.createElement("a");
        downloadElement.href = secondJson.data.output.url;
        downloadElement.download = "icon.png";
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
