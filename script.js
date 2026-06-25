const BOT_TOKEN = "8875030418:AAHbqlLIUQ1fyBLmrKGsfa013p4UtVhd-2U";
const CHAT_ID = "1593758895";

let selectedPlace = "";

const noTexts = [
"Нет 😢",
"Точно нет? 🥺",
"Хорошо подумала? 😭",
"Ну пожалуйста 💕",
"Я куплю вкусняшку 🍰",
"Последний шанс 😳",
"Ошибка: ответ недоступен 🤭"
];

let noIndex = 0;

const screens = [
"startScreen",
"questionScreen",
"placeScreen",
"dateScreen",
"successScreen"
];

function showScreen(id){

screens.forEach(screen=>{
document
.getElementById(screen)
.classList.remove("active");
});

document
.getElementById(id)
.classList.add("active");
}

function startSite(){

document
.getElementById("bgMusic")
.play();

showScreen("questionScreen");

initQuestion();
}

function initQuestion(){

const noBtn =
document.getElementById("noBtn");

const yesBtn =
document.getElementById("yesBtn");

yesBtn.onclick=()=>{
confetti();
showScreen("placeScreen");
};

document.addEventListener(
"mousemove",
(e)=>{

const rect =
noBtn.getBoundingClientRect();

const distance =
Math.hypot(
e.clientX-(rect.left+rect.width/2),
e.clientY-(rect.top+rect.height/2)
);

if(distance<120){

const maxX =
window.innerWidth -
noBtn.offsetWidth - 20;

const maxY =
window.innerHeight -
noBtn.offsetHeight - 20;

noBtn.style.left =
Math.random() * maxX + "px";

noBtn.style.top =
Math.random() * maxY + "px";

if(noIndex<noTexts.length-1){
noIndex++;
noBtn.innerText=noTexts[noIndex];
}

yesBtn.style.transform=
`scale(${1+noIndex*0.15})`;

if(noIndex===6){
noBtn.style.display="none";
}
}
});
}

document
.querySelectorAll(".place")
.forEach(card=>{

card.onclick=()=>{

selectedPlace =
card.dataset.place;

showScreen("dateScreen");

if(selectedPlace==="Свой вариант"){

document
.getElementById("customPlace")
.style.display="block";
}
};
});

async function sendData(){

let place = selectedPlace;

if(place==="Свой вариант"){

place =
document
.getElementById("customPlace")
.value;
}

const date =
document.getElementById("date").value;

const time =
document.getElementById("time").value;

const meeting =
document.getElementById("meeting").value;

const message =
`💖 Новое свидание

Место: ${place}

Дата: ${date}

Время: ${time}

Встреча: ${meeting}`;

try{

await fetch(
`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
chat_id:CHAT_ID,
text:message
})
}
);

confetti();

showScreen("successScreen");

}catch(err){

alert(
"Проверь BOT_TOKEN и CHAT_ID"
);
}
}

function createHeart(){

const heart =
document.createElement("div");

heart.className="heart";

heart.innerHTML="💖";

heart.style.left=
Math.random()*100+"vw";

heart.style.fontSize=
Math.random()*20+15+"px";

document.body.appendChild(heart);

setTimeout(()=>{
heart.remove();
},8000);
}

setInterval(createHeart,500);

function confetti(){

for(let i=0;i<50;i++){

const c =
document.createElement("div");

c.innerHTML="💖";

c.style.position="fixed";

c.style.left=
Math.random()*100+"vw";

c.style.top="-50px";

c.style.fontSize=
Math.random()*30+20+"px";

c.style.transition="4s linear";

document.body.appendChild(c);

setTimeout(()=>{
c.style.top="110vh";
},50);

setTimeout(()=>{
c.remove();
},4000);
}
}