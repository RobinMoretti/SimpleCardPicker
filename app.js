let cardContainerTarget = document.getElementById("cards-container"); 
let decks = {};
let cards, categories;

fetch('./cards.json')
    .then((response) => response.json())
	.then((json) => {
		cards = json;
		initCards();
	});
	

function initCards() {
	cards.forEach(card => {
		if (!decks[card.Tags]) {
			decks[card.Tags] = [];
		}
	
		decks[card.Tags].push(card.Name)
	});
	
	categories = Object.keys(decks); 
	
	for (let i = 0; i < categories.length - 1; i++) {
		let category = categories[i];
		
		let cards = decks[category];
		let card = cards[getRandomInt(cards.length)];
	
		let cardElement = generateCardHTML(i, card, category);
		
		cardContainerTarget.appendChild(cardElement);
		
		document.getElementById("category-" + i).addEventListener("click", (event) => {
			let cardElement = event.target;
			revealCard(cardElement);
		})
	}
}

function generateCardHTML(id, cardTitle, deckCategory) {
	let cardContainer = document.createElement("div");
	cardContainer.classList.add("card");
	cardContainer.setAttribute("id", "category-" + id);

	let innerContainer = document.createElement("div");
	innerContainer.classList.add("inner");
	cardContainer.appendChild(innerContainer);

	let frontElement = document.createElement("div");
	frontElement.classList.add("front");

	let frontTitleElement = document.createElement("p");
	frontTitleElement.classList.add("title");
	frontTitleElement.innerText = cardTitle;
	frontElement.appendChild(frontTitleElement);

	let frontCategoryElement = document.createElement("p");
	frontCategoryElement.classList.add("category");
	frontCategoryElement.innerText = deckCategory;
	frontElement.appendChild(frontCategoryElement);

	let backElement = document.createElement("div");
	backElement.classList.add("back");

	innerContainer.appendChild(frontElement);
	innerContainer.appendChild(backElement);

	return cardContainer;
}

function revealCard(cardElement) {
	cardElement.classList.toggle("active");

	if (!cardElement.classList.contains("active")) {
		let categoryIndex = cardElement.getAttribute("id").replace("category-", "");
		let categoryCards = decks[categories[categoryIndex]];
		let newCard = categoryCards[getRandomInt(categoryCards.length)];

		setTimeout(() => {
			// do it after the card rotation
			cardElement.querySelector(".title").innerText = newCard;
		}, 600);
	}
}

// function revealAllCards() {
// 	let cards = document.querySelectorAll(".card");
// 	cards.forEach(card => {
// 		card.classList.add("active")
// 	});
// }

// document.body.addEventListener("click", revealAllCards)

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}
  
