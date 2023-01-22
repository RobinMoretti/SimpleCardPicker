window.onload = function () {
	let titleLetters = document.querySelectorAll("h2 span");

	for (let index = 0; index < titleLetters.length; index++) {
		const letter = titleLetters[index];
		console.log(index)
		letter.style.animationDelay = index * 0.2 + "s";
	}
}