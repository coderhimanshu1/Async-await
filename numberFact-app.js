// global variables
let cardHolder = document.getElementById("container");
const form = document.getElementById("form");
let checkbox = document.getElementById("checkbox");

form.addEventListener("submit", (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the number from input field
  let number = document.getElementById("number").value;

  // check if invalid input
  if (!number) {
    alert("Please enter a valid number.");
    form.reset();
    return;
  }

  //API URL
  let url = `http://numbersapi.com/${number}?json`;

  /*******  Solution 1  *******/

  //   Promise to get data from API
  if (number.length < 2 && !checkbox.checked) {
    getNumberFact();
  }

  async function getNumberFact() {
    let res = await axios.get(url);
    generateCard(res.data.text);
  }

  /******* End of Solution 1 ********/

  /*******  Solution 2  *******/

  if (number.length > 1 && !checkbox.checked) {
    getNumbersFact();
  }

  async function getNumbersFact() {
    let res = await axios.get(url);
    let facts = res.data;
    multipleInputs(facts);
  }

  /******* End of Solution 2  *******/

  /*******  Solution 3  *******/

  if (checkbox.checked) {
    getMultipleFacts();
  }

  async function getMultipleFacts() {
    let res = await Promise.all([
      axios.get(`${url}/${number}?json`),
      axios.get(`${url}/${number}?json`),
      axios.get(`${url}/${number}?json`),
      axios.get(`${url}/${number}?json`),
    ]);
    let facts = [res[0].data, res[1].data, res[2].data, res[3].data];
    console.log(facts);
    multipleInputs(facts);
  }

  /*******  End of Solution 3  *******/

  //   reset form after submit
  form.reset();
});

// Function to generate array from API response
function multipleInputs(facts) {
  let factArray = Object.values(facts);
  factArray.forEach((fact) => {
    generateCard(fact);
  });
}

// Generate information card

function generateCard(fact) {
  const card = document.createElement("div");
  card.classList.add("card", "m-2", "bg-dark", "text-light");
  card.style.width = "18rem";
  card.style.display = "inline-block";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.textContent = fact;

  cardBody.appendChild(cardText);

  card.appendChild(cardBody);
  cardHolder.appendChild(card);

  return cardHolder;
}
