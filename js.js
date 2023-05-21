var flag = 0; // game status
var playername;
var numberOfCards
var massage;
var inputstage;
var gamestage;
var x = 0;
var score = 0;
var currcards;

function verify(){
    playername = document.getElementById("name").value;
    numberOfCards = document.getElementById("numcard").value;
    massage = document.getElementById("massages");
    lastgamecards = numberOfCards;
    if(playername.length <= 0){
        massage.innerHTML = "ERROR: You didnt write your name.";
        massage.style.color = "red";
        return;
    }

    if(numberOfCards < 2 || numberOfCards > 30){
        massage.innerHTML = "ERROR: cards must be between 2 and 30.";
        massage.style.color = "red";
        return;
    }
    flag = 1;
    start();
    return;
}

function start(){
    if(flag != 1){
        massage.innerHTML = "Game failed to start";
        massage.style.color = "red";
    }
    document.getElementById("afterstage").style.display = "none";
    inputstage = document.getElementById("inputstage");
    gamestage = document.getElementById("gamestage");
    gamestage.style.display = "block";
    inputstage.style.display = "none";
    gamestage.style.opacity = "1";
    currcards = numberOfCards;
    document.getElementById("player").innerHTML = playername;
    document.getElementById("player").style.color = "red";
    startTime();
    let arr = [
    "1Y","1Y","1T","1T","1A","1A","1L","1L",
    "2Y","2Y", "2T","2T", "2A","2A", "2L","2L",
    "3Y","3Y", "3T","3T", "3A","3A", "3L","3L",
    "4Y","4Y", "4T","4T", "4A","4A", "4L","4L",
    "5Y","5Y", "5T","5T", "5A","5A", "5L","5L",
    "6Y","6Y", "6T","6T", "6A","6A", "6L","6L",
    "7Y","7Y", "7T","7T", "7A","7A", "7L","7L",
    "8Y","8Y", "8T","8T"];
    arr.splice(numberOfCards*2, arr.length - numberOfCards*2);
    var cardElement = document.getElementById("card-con");
    let x;
    for(i = 0; i < numberOfCards*2; i++){
        x = Math.floor(Math.random()*arr.length);
        tots = cardElement.appendChild(document.createElement("div"));
        tots.setAttribute("class","card");
        tots.setAttribute("id",arr[x]);
        tots.setAttribute("value",i+1);
        tots.setAttribute("onclick","check(this)");
        arr.splice(x,1);
    }
}

var s = "0";
var c = "0";
function check(element){
    if(s === "0"){
    element.style.backgroundImage = "url('images/"+element.id+".jpg')";
    s = element;
    s.removeAttribute("onclick");
    return;
    }
    if(c === "0"){
        element.style.backgroundImage = "url('images/"+element.id+".jpg')";
    c = element;
    c.removeAttribute("onclick");
    }
    if(c.id === s.id){
        c = "0";
        s = "0";
        numberOfCards = numberOfCards - 1;
        score++;
        if(numberOfCards == 0){
            closegame();
        }
        return;
    }
    if(c.id !== s.id){
        setTimeout(function() {
        c.style.backgroundImage = "url('images/backcard.jpg')";
        s.style.backgroundImage = "url('images/backcard.jpg')";
        s.setAttribute("onclick","check(this)");
        c.setAttribute("onclick","check(this)");
        s = "0";
        c = "0";
        }, 1000);
        return;
    }
}


function startTime() {
    if(flag != 1){
        return;
    }
    x++;
    document.getElementById("time").innerHTML = "Time: " + x;
    setTimeout(function() {startTime()}, 1000);
}

function closegame(){
    var list = document.getElementById('card-con');
    while (list.firstChild) {
    list.removeChild(list.firstChild);
    }
    gamestage.style.opacity = "0";
    gamestage.style.display = "none";
    document.getElementById("endmsg").innerHTML = "Game finished";
    document.getElementById("endmsg").style.color = "beige";
    document.getElementById("afterstage").style.display = "block";
    document.getElementById("endpname").innerHTML = playername;
    document.getElementById("endpname").style.color = "red";
    document.getElementById("endpname").style.marginRight = "30px";
    document.getElementById("endscore").innerHTML = score;
    document.getElementById("endtime").innerHTML = x + " seconds";
    document.getElementById("endtime").style.color = "red";
    document.getElementById("endcards").innerHTML = currcards;
    document.getElementById("endcards").style.color = "red";
    if(score == currcards){
        document.getElementById("endmsg").innerHTML = "Congratulation you made it !";
        document.getElementById("endmsg").style.color = "lightgreen";
    }
    flag = 0;
    x = 0;
    score = 0;
    numberOfCards = NULL;
    playername = NULL;
}

function newgame(){
    document.getElementById("afterstage").style.display = "none";
    document.getElementById("inputstage").style.display = "block";
    gamestage.style.display = "block";
    massage.innerHTML = "Memory Game";
    massage.style.color = "beige";
}