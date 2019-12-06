/*
* Made by: UndercoverGoose
* Version: 1.4
* Features: Highlighting,
            Auto input,
            Bigger answer boxes,
            Hidden answer,
            Keybinds,
            Themes without buying them
*
* Upcoming Features: Instant Purchases
*
* Unblocked by Frued Dued after UndercoverGoose attempted phishing attack
*/

// Function to simplify the creation, appending, and getting of objects/elements
function gcn(x,y){return document.getElementsByClassName(x)[y]}
function cre(t,c,s,i){let x=document.createElement(t);x.className=c,x.style=s,x.innerHTML=i;return x;}
function app(v){document.body.appendChild(v)}
function appd(v){document.getElementsByClassName('hckcntnt')[1].appendChild(v)}
function apps(v){document.getElementsByClassName('hckcntnt')[7].appendChild(v)}

// Applies default button color and look without having to purchase an upgrade to update the style
let newstyle = document.createElement('style');
newstyle.textContent='.fkLxCm {box-sizing: border-box;font-size: 17px;color: white;font-weight: bold;text-align: center;display: inline-block;user-select: none;cursor: pointer;padding: 12px 16px;background: rgb(0, 85, 255);transition: background 0.2s ease 0s;border-radius: 4px;font-family: "Product Sans", sans-serif;}';
app(newstyle);

// Gets answers/questions
let j=JSON[Object.keys(JSON)],qs=[],as=[];
for(let x=0;x<j.length;x++){qs.push(j[x].text),as.push(j[x].answers[0].text);}

// Cheat toggles and "Menu" button creation
let f = [0, 0, 0, 0, 0, 0];
let hconfig = {
  keybinds:{
    hidemenu: 67, // c
    highlight: 72, // h
    biganswer: 66, // b
    inputanswer: 73, // i
    hiddenanswer: 79 // o
  },
  theme:{
    active:"default",
    default:[[48,63,159],[119,19,34],[168,92,21],[13,107,51],[7,98,150]],
    night:[[0,10,18],[38,50,56],[55,71,79],[69,90,100],[84,110,122]],
    thanos:[[13,0,25],[34,0,68],[51,0,102],[62,0,124],[79,23,135]],
    ocean:[[0,0,99],[40,53,147],[7,98,150],[2,119,189],[21,101,192]],
    forest:[[76,61,51],[56,86,69],[66,92,73],[65,86,65],[76,99,73]],
    sunset:[[127,116,150],[224,111,90],[237,113,45],[122,89,106],[232,171,60]],
    retro:[[156,0,34],[0,29,59],[255,174,82],[254,89,99],[167,28,148]],
    gold:[[255,190,25],[255,205,43],[255,199,33],[255,209,71],[255,205,56]]
  }
}
let btnattr={
  style:"width:200px;height:40px;margin-top:3px;background:#aa3333",
  class:"sc-bdVaJa fkLxCm hckcntnt"
}

let b = cre('div',btnattr.class,"position: fixed; z-index: 1000000; left: 5px; bottom: 5px; width: 100px; height: 40px;","Menu");
b.onclick=function(){if(f[0]===0){gcn('hckcntnt',1).style.display="block",f[0]=1,gcn('hckcntnt',0).innerHTML="X",gcn('hckcntnt',0).style.background="#ff0000";}else{gcn('hckcntnt',1).style.display="none",f[0]=0,gcn('hckcntnt',0).innerHTML="Menu",gcn('hckcntnt',0).style.background="";}};app(b);

// Area for cheat buttons
app(cre("div",btnattr.class,"position:fixed;z-index:10000;left:5px;bottom:5px;width:300px;height:600px;display:none",""));

// Toggles/creates highlight answers cheat
let h = cre("div",btnattr.class,btnattr.style,"Highlight Answers");
h.onclick=function(){if(f[1]===0){gcn('hckcntnt',2).style.background="#33aa33";f[1]=1;hlinterval=setInterval(highlight,0);}else{gcn('hckcntnt',2).style.background="#aa3333";f[1]=0;clearInterval(hlinterval);}}
appd(h);

// Toggles/creates big answer cheat
let ab = cre("div",btnattr.class,btnattr.style,"Big Answer Box");
ab.onclick=function(){if(f[2]===0){gcn('hckcntnt',3).style.background="#33aa33";f[2]=1;bainterval=setInterval(biganswer,0);}else{gcn('hckcntnt',3).style.background="#aa3333";f[2]=0;clearInterval(bainterval);}}
appd(ab);

// Toggles/creates input answer cheat
let ia = cre("div",btnattr.class,btnattr.style,"Input Answer");
ia.onclick=function(){if(f[3]===0){gcn('hckcntnt',4).style.background="#33aa33";f[3]=1;iainterval=setInterval(inputanswer,0);}else{gcn('hckcntnt',4).style.background="#aa3333";f[3]=0;clearInterval(iainterval);}}
appd(ia);

// Toggles/creates hidden answer cheat
let ha = cre("div",btnattr.class,btnattr.style,"Hidden Answer");
ha.onclick=function(){if(f[5]===0){gcn('hckcntnt',5).style.background="#33aa33";f[5]=1;hainterval=setInterval(hiddenanswer,0);}else{gcn('hckcntnt',5).style.background="#aa3333";f[5]=0;clearInterval(hainterval);document.title="Play Gimkit! - Enter game code here";}}
appd(ha);

// Creates settings button
let se = cre("div",btnattr.class,"width:170px;height:40px;margin-top:3px;background:#333333;position:absolute;bottom:0px;right:0px","Settings");
se.onclick=function(){if(f[6]===0){gcn('hckcntnt',7).style.display="block";f[6]=1;}else{f[6]=0;gcn('hckcntnt',7).style.display="none";}}
appd(se);

// Creates setttings placeholder
let sep = cre("div",btnattr.class,"position: fixed; z-index: 10000; left: 310px; bottom: 5px; width: 300px; height: 600px; display: none;","");
app(sep);

let setxt = document.createElement('span');
setxt.appendChild(document.createTextNode('Themes'));
apps(setxt);

apps(document.createElement('br'));

// Theme Buttons
for(let x=0;x<8;x++){
  let y=hconfig.theme;
  let t = cre("div","sc-bdVaJa fkLxCm","width:200px;height:40px;margin-top:3px;background:rgb("+y[Object.keys(y)[x+1]][3].join(",")+")",Object.keys(y)[x+1]);
  t.onclick=function(){y.active=Object.keys(y)[x+1]};
  apps(t);
}

// Functions that make the cheats work
function highlight(){
  try{
    let d=document.getElementsByClassName('notranslate lang-en'),q=d[0].innerHTML,a=[d[1].innerHTML,d[2].innerHTML,d[3].innerHTML,d[4].innerHTML],i=a.indexOf(as[qs.indexOf(q)])+1;
    d[i].parentNode.parentNode.style.background="white",d[i].style.color="black";
  }catch(err){}
}

function biganswer(){
  try{
    let d=document.getElementsByClassName('notranslate lang-en'),q=d[0].innerHTML,a=[d[1].innerHTML,d[2].innerHTML,d[3].innerHTML,d[4].innerHTML],i=a.indexOf(as[qs.indexOf(q)])+1;
    d[i].parentNode.parentNode.parentNode.style="position:fixed;left:5px";
  }catch(err){}
}
function inputanswer(){
  try{
    let q=document.getElementsByClassName('notranslate lang-en')[0].innerHTML;
    document.getElementsByClassName('sc-jhAzac egTZap')[0].value=as[qs.indexOf(q)];
  }catch(err){}
}
function hiddenanswer(){
  try {
    let d=document.getElementsByClassName('notranslate lang-en'),q=d[0].innerHTML,a=[d[1].innerHTML,d[2].innerHTML,d[3].innerHTML,d[4].innerHTML],i=a.indexOf(as[qs.indexOf(q)])+1;
    document.title=i + "lay Gimkit! - Enter game code here";
  }catch(err){}
}

// Theme changer
function themechanger(){
  try{
    gcn('sc-bwzfXH',0).style.background="rgb("+hconfig.theme[hconfig.theme.active][0].join(",")+")";
    gcn('hckcntnt',1).style.background="rgb("+hconfig.theme[hconfig.theme.active][4].join(",")+")";
    gcn('hckcntnt',7).style.background="rgb("+hconfig.theme[hconfig.theme.active][2].join(",")+")";
    for(let x=0;x<5;x++){
      gcn('sc-Rmtcm',x).style.background="rgb("+hconfig.theme[hconfig.theme.active][x+1].join(",")+")";
    }
  }catch(err){}
}setInterval(themechanger, 0);

// Key events for added features
window.onkeydown=function(e){
  if(e.keyCode===hconfig.keybinds.hidemenu){
    if(f[4]===0){
      f[4]=1;
      document.getElementsByClassName('hckcntnt')[0].style.display="none"
    }else {
      f[4]=0;
      document.getElementsByClassName('hckcntnt')[0].style.display=null;
    }
  }else if(e.keyCode===hconfig.keybinds.highlight){
    highlight();
  }else if(e.keyCode===hconfig.keybinds.biganswer){
    biganswer();
  }else if(e.keyCode===hconfig.keybinds.inputanswer){
    inputanswer();
  }else if(e.keyCode===hconfig.keybinds.hiddenanswer){
    hiddenanswer();
  }
}
