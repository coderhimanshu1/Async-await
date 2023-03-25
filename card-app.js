let baseURL = "https://deckofcardsapi.com/api/deck";

/***** Solution 1 *****/

async function getCard() {
  let res = await axios.get(`${baseURL}/new/draw/`);
  let { suit, value } = res.data.cards[0];
  console.log(
    "Draw single card from a deck >>>>",
    `${value.toLowerCase()} of ${suit.toLowerCase()}`
  );
}

getCard();

/***** Solution 2 *****/

async function drawTwoCards() {
  let res = await axios.get(`${baseURL}/new/draw/`);
  let deckId = res.data.deck_id;
  let firstCard = res.data.cards[0];

  let res1 = await axios.get(`${baseURL}/${deckId}/draw/`);
  let secondCard = res1.data.cards[0];
  console.log(
    `Card 1: ${firstCard.value} of ${firstCard.suit}`,
    `Card 2: ${secondCard.value} of ${secondCard.suit}`
  );
}

drawTwoCards();

/***** Solution 3 *****/
let btn = document.getElementById("button");
let cardContainer = document.querySelector("#card-container");
let deckId;

async function setup() {
  if (deckId) {
    let res = await axios.get(`${baseURL}/${deckId}/draw/`);
    console.log("remaining cards", res.data.remaining);
    let cardSrc = res.data.cards[0].image;
    let angle = Math.random() * 90 - 45;
    let randomX = Math.random() * 40 - 20;
    let randomY = Math.random() * 40 - 20;
    let img = document.createElement("img");
    img.setAttribute("src", cardSrc);
    img.setAttribute(
      "style",
      `transform: translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
    );
    cardContainer.append(img);

    // Remove button if no remaining cards in the deck
    if (res.data.remaining === 0) {
      btn.remove();
    }
  } else {
    let res = await axios.get(`${baseURL}/new/shuffle/`);
    console.log("deck id", res.data.deck_id);
    deckId = res.data.deck_id;
    let res1 = await axios.get(`${baseURL}/${deckId}/draw/`);

    console.log("remaining cards", res.data.remaining);
    let cardSrc = res1.data.cards[0].image;
    let angle = Math.random() * 90 - 45;
    let randomX = Math.random() * 40 - 20;
    let randomY = Math.random() * 40 - 20;
    let img = document.createElement("img");
    img.setAttribute("src", cardSrc);
    img.setAttribute(
      "style",
      `transform: translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
    );
    cardContainer.append(img);

    // Remove button if no remaining cards in the deck
    if (res.data.remaining === 0) {
      btn.remove();
    }
  }
}

btn.addEventListener("click", setup);
