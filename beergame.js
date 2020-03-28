//variables declaration
let deckCount = 0;
let dumpNumber = [];
let dumpSuits = [];
let previousCard = '';
let previousSuit = '';
let Counter = 0;
let failCheck = 0;
let splicer = 4;
let y = 0;
const Cards = ['Ace','2','3','4','5','6','7','8','9','10','Jack','Queen','King'];
const Suits = ['Hearts','Diamonds','Clovers','Spades'];

//functions area
window.addEventListener('load',function(){
    var ButtonsDiv = document.getElementById('buttonsArea');
    for (x = 0; x < 3; x++){
        let buttonMade = document.createElement('button');
        ButtonsDiv.appendChild(buttonMade);
        if(x == 0){
            buttonMade.innerText = "Rules";
            buttonMade.id = "rulesAlone";
            buttonMade.className = "cardsOrNot";
            buttonMade.addEventListener('click',() => removeButtons()); //keep it dry****
        }
        if(x == 1){
            buttonMade.innerText = "Rules & Cards";
            buttonMade.id = "rulesAndCards";
            buttonMade.className = "cardsOrNot";
            buttonMade.addEventListener('click',() => removeButtons()); //keep it dry****
        }
        else if(x == 2){
            buttonMade.innerText = "Draw a card";
            buttonMade.id = "drawCard";
            buttonMade.className = "cardPuller";
            buttonMade.addEventListener('click',() => Deck(1));
        }
    }
    console.log('all assets are loaded');
})

function removeButtons(x){
    console.log(event.target.id);
    // let currentObject = event.target.id;
    array = document.getElementsByClassName('cardsOrNot');
    for (var j = 0; j < array.length;j++){
        array[j].style.display = "none";
    }
    document.getElementById('rules').style.display = "block";
    if(event.target.id == 'rulesAndCards'){
        document.getElementById('rules').style.width = '25%';
        document.getElementById('rules').style.left = '5%';
        //document.getElementById('rules').className = "cardPuller";
        
    }
    else if (event.target.id == "rulesAlone"){

        document.getElementById("drawCard").style.display = "none";
        return true;
    }
    else{

        alert ("Error, Button not identified.");
        document.getElementById("buttonsArea").style.color = "red";
    }
}


function Deck(x){
    if(x==1){
        if(Counter==0){console.log('New deck unwrapped'); Counter++;}
        if(deckCount<54){
            let randomCard = Cards[Math.floor(Math.random()*Cards.length)];
            let randomSuit = Suits[Math.floor(Math.random()*Suits.length)];
            console.log(randomCard + " of " + randomSuit + "(starting random)");
            

            for(j=0;j<dumpNumber.length;j++){
                console.log("checking if doubled");
                while(randomCard === dumpNumber[j] && randomSuit === dumpSuits[j]){
                    console.log("entered while argument");
                    randomSuit = Suits[Math.floor(Math.random()*Suits.length)];
                    for(y=0, splicer='crap';splicer!==randomCard;y++){
                        splicer=Cards[y];
                        // console.log(splicer, y);
                    }
                    console.log(splicer, y);                    
                    console.log("suit randomized");
                    j=0;
                    // Counter++;
                    for(x=0,Counter=0;x<=dumpNumber.length;x++){
                        if(randomCard===dumpNumber[x]){
                            Counter++;
                            console.log("found in array " + Counter + " times");
                        }
                        if(Counter==4){
                            Cards.splice(y-1,1);
                            randomCard = Cards[Math.floor(Math.random()*Cards.length)];
                            j=0;
                            console.log("cards spliced");
                            console.log(Cards);
                            x=Cards.length+3;
                            Counter = 0;
                        }
                    }
                }
            }
            console.log(randomCard + " of " + randomSuit + "(ending random)");           
            dumpNumber.push(randomCard);
            console.log(dumpNumber);
            dumpSuits.push(randomSuit);
            if(dumpNumber.length===52){console.log("deck out of cards")}
        }
    }
}
