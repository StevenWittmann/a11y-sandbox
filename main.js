const showDialog = () => {
	const dialog = document.getElementById("dialog1");
	dialog.hidden = false;
	dialog.querySelector("button").focus();
};

const closeDialog = () => {
	const dialog = document.getElementById("dialog1");
	dialog.hidden = true;
};

const makeOrder = () => {
	const messages = {
		2: "Deine Bestellung wurde erfolgreich verarbeitet.",
		3: "Das Faxgerät hat deine Bestellung in der Filiale ausgedruckt.",
		4: "Deine Pizza wird belegt.",
		5: "Deine Pizza befindet sich im Backofen.",
		6: "Deine Pizza ist abholbereit.",
	};
	const messageKeys = Object.keys(messages);
	const statusElement = document.getElementById("status");

	statusElement.classList.remove("ready");
	statusElement.innerText =
		"Deine Bestellung wird verarbeitet, bitte warten und den Browsertab nicht schließen.";
	messageKeys.reduce((acc, key) => {
		const time = acc + Math.floor(Math.random() * 3000) + 2000;
		setTimeout(
			() => {
				statusElement.innerText = messages[key];
				if (key === "6") {
					statusElement.classList.add("ready");
				}
			},
			acc + Math.floor(Math.random() * 3000) + 1000,
		);
		return time;
	}, 0);
};

// Get all buttons with the 'toggle-btn' class
const toggleButtons = document.querySelectorAll(".toggle-btn");

for (let i = 0; i < toggleButtons.length; i++) {
	toggleButtons[i].addEventListener("click", toggleVisibility);
}

function toggleVisibility() {
	const nextPreElement = findNextSiblingPreElement(this);
	if (nextPreElement) {
		nextPreElement.classList.toggle("hidden");
		this.textContent = !nextPreElement.classList.contains("hidden")
			? "Hide a11y improved code"
			: "Show a11y improved code";
		updateButtonText(this, nextPreElement);
	}
}

function findNextSiblingPreElement(element) {
	let sibling = element.nextElementSibling;
	while (sibling && sibling.tagName !== "PRE") {
		sibling = sibling.nextElementSibling;
	}
	return sibling;
}
