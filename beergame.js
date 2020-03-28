//variables declaration
let deckCount = 0
let cardCounter = 0

let dumpNumber = []
let dumpSuits = []
let previousCard = ""
let previousSuit = ""
let failCheck = 0
let splicer = 4
let y = 0

const cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
const suits = ["Hearts", "Diamonds", "Clovers", "Spades"]
const colors = ["red", "black"]

const cardNumberElements = document.querySelectorAll(".card-number")
const cardSuiteElements = document.querySelectorAll(".card-suite")
const closeRulesButton = document.querySelector("#rules-close")

// functions area
window.addEventListener("load", buttonsManager)

closeRulesButton.addEventListener("click", () => {
  toggleRulesModal(false)
})

function buttonsManager() {
  var ButtonsDiv = document.getElementById("buttonsArea")
  for (let button = 0; button < 2; button++) {
    let buttonMade = document.createElement("button")
    ButtonsDiv.appendChild(buttonMade)
    if (button == 0) {
      buttonMade.innerText = "Rules & Cards"
      buttonMade.id = "rulesAndCards"
      buttonMade.className = "cardsOrNot"
      buttonMade.addEventListener("click", () => toggleRulesModal(true)) //keep it dry****
    } else if (button == 1) {
      buttonMade.innerText = "Draw a card"
      buttonMade.id = "drawCard"
      buttonMade.className = "cardPuller"
      buttonMade.addEventListener("click", () => drawCard(1))
    }
  }
  console.log("all assets are loaded")
}

function toggleRulesModal(isOpen) {
  document.getElementById("rules").style.display = isOpen ? "block" : "none"
}

function drawCard(x) {
  const card = {}

  if (cardCounter === 0) {
    console.log("New deck unwrapped")
    cardCounter++
  }

  const isGameFinished = cardCounter >= 52
  if (isGameFinished) {
    // @TODO: Yonatan finish game
    alert("END GAME")
    return
  }

  let randomSuite = suits[Math.floor(Math.random() * suits.length)]
  let randomCard = cards[Math.floor(Math.random() * cards.length)]
  console.log(randomCard + " of " + randomSuite + "(starting random)")

  for (j = 0; j < dumpNumber.length; j++) {
    console.log("checking if doubled")
    while (randomCard === dumpNumber[j] && randomSuite === dumpSuits[j]) {
      console.log("entered while argument")
      randomSuite = suits[Math.floor(Math.random() * suits.length)]
      for (y = 0, splicer = "crap"; splicer !== randomCard; y++) {
        splicer = cards[y]
        // console.log(splicer, y);
      }
      console.log(splicer, y)
      console.log("suit randomized")
      j = 0
      // Counter++;
      for (x = 0, cardCounter = 0; x <= dumpNumber.length; x++) {
        if (randomCard === dumpNumber[x]) {
          cardCounter++
          console.log("found in array " + cardCounter + " times")
        }
        if (cardCounter == 4) {
          cards.splice(y - 1, 1)
          randomCard = cards[Math.floor(Math.random() * cards.length)]
          j = 0
          console.log("cards spliced")
          console.log(cards)
          x = cards.length + 3
          cardCounter = 0
        }
      }
    }
  }

  card.suite = randomSuite
  card.number = randomCard

  if (randomSuite === "Hearts" || randomSuite === "Diamonds") {
    card.color = "red"
  } else {
    card.color = "black"
  }

  console.log(`
    FINISHED DRAWING A CRAD
    =======================================
        NUMBER: ${card.number} 
        COLOR: ${card.color}
        suite: ${card.suite}
    =======================================
  `)

  cardNumberElements.forEach(element => {
    element.innerHTML = card.number
    element.style.color = card.color
  })
  cardSuiteElements.forEach(element => {
    element.innerHTML = getSuiteSvg(card.suite, card.color)
  })

  dumpNumber.push(randomCard)
  console.log(dumpNumber)
  dumpSuits.push(randomSuite)

  if (dumpNumber.length === 52) {
    console.log("deck out of cards")
  }
}

function getSuiteSvg(suite, color) {
  switch (suite) {
    case "Hearts":
      return `<svg viewBox="0 0 512 512" height=".75em"><path fill="${color}" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>`
    case "Spades":
      return `<svg viewBox="0 0 512 512" height="1.25em" fill="${color}" style="left: 0%; top: 0%;"><path d="M272.5 6.6c-9.3-8.8-23.8-8.8-33.1 0C191.4 52.4 53.6 185 32 208.9c-19.3 21.3-32 49.4-32 80.6C0 360 54.9 415.7 123.5 416c36.7.1 69.7-15.7 92.5-40.9-.1 36.6-.8 52.3-52.4 75.4-14.1 6.3-22.2 21.6-18.7 36.6 3.3 14.5 16.3 24.8 31.2 24.8h159.4c15.5 0 29.2-10.8 32.1-26 2.8-14.6-4.8-29.2-18.4-35.2-51.6-23-52.8-38.1-53-75.6 23.4 25.8 57.5 41.8 95.3 40.8 67.5-1.7 120.7-56.5 120.7-124 0-32.2-12.2-61.2-32-83.1C458.4 185 320.6 52.4 272.5 6.6z"></path></svg>`
    case "Diamonds":
      return `<svg viewBox="0 0 448 512" height=".75em"><path fill="${color}" d="M242.2 8.3c-9.6-11.1-26.8-11.1-36.4 0l-200 232c-7.8 9-7.8 22.3 0 31.3l200 232c9.6 11.1 26.8 11.1 36.4 0l200-232c7.8-9 7.8-22.3 0-31.3l-200-232z"></path></svg>`
    case "Clovers":
      return `<svg viewBox="0 0 512 512" height=".75em"><path fill="${color}" d="M371.5 169.1C403.1 88.4 343.7 0 256 0c-87.8 0-147 88.5-115.5 169.1C65.7 159.2 0 217.3 0 292c0 68.5 55.5 124 124 124 36.5 0 69.3-15.8 92-40.9-.1 36.7-.8 52.4-53 75.6-13.8 6.1-21.4 21.1-18.3 35.9 3.1 14.8 16.2 25.4 31.3 25.4h160c15.1 0 28.2-10.6 31.3-25.4 3.1-14.8-4.5-29.7-18.3-35.9-51.6-23-52.8-38.1-53-75.6 22.7 25.1 55.5 40.9 92 40.9 68.5 0 124-55.5 124-124 0-74.8-65.8-132.8-140.5-122.9z"></path></svg>`
  }
}
