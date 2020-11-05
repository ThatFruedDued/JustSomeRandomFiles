function DCBot(id, token){
  this.id = id;
  this.token = token;
  this.url = `https://discordapp.com/api/webhooks/${id}/${token}`;
  this.send = (message, username, avatarUrl) => {
    let jsonBody;
    if(message == null){
      console.error("no message provided");
      return;
    } else if(username == null){
      jsonBody = JSON.stringify({
        "content": message
      });
    } else if(avatarUrl == null){
      jsonBody = JSON.stringify({
        "content": message,
        "username": username
      });
    } else {
      jsonBody = JSON.stringify({
        "content": message,
        "username": username,
        "avatar_url": avatarUrl
      });
    }
    fetch(this.url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: jsonBody
    });
  };
}
