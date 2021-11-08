(() => {
    const url = document.getElementsByClassName("no-attribution")[0].style.backgroundImage.split('url("')[1].split('")')[0];
    const downloadElement = document.createElement("a");
    downloadElement.href = url;
    downloadElement.download = "icon.svg";
    downloadElement.style.display = "none";
    document.body.appendChild(downloadElement);
    downloadElement.click();
})();
