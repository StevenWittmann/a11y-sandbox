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

// Get all buttons with the 'toggle-code-visibility' class
const toggleButtons = document.querySelectorAll(".toggle-code-visibility");

for (let i = 0; i < toggleButtons.length; i++) {
	toggleButtons[i].addEventListener("click", toggleVisibility);
}

function toggleVisibility() {
	const nextPreElement = findNextSiblingPreElement(this);
	if (nextPreElement) {
		nextPreElement.forEach((pre) => {
			pre.classList.toggle("hidden");
		});

		this.textContent = !nextPreElement[0].classList.contains("hidden")
			? "hide code"
			: "show code";
	}
}

function findNextSiblingPreElement(element) {
	let sibling = element.nextElementSibling;
	while (sibling && sibling.tagName !== "PRE") {
		sibling = sibling.nextElementSibling;
	}

	if (!sibling) return null;

	const preElements = [sibling];
	const nextSibling = preElements[0].nextElementSibling;
	if (nextSibling && nextSibling.tagName === "PRE") {
		preElements.push(nextSibling);
	}

	console.log(preElements);

	return preElements;
}

/* ARIA Necessary Page */

const tabComponent = document.getElementById("tab-component");
const tabs = tabComponent.querySelectorAll("button");
const panels = tabComponent.querySelectorAll("div[role=tabpanel]");
let lastFocussed = null;
for (let i = 0; i < tabs.length; i++) {
	tabs[i].addEventListener("click", (event) => {
		tabs.forEach((tab) => {
			tab.setAttribute("aria-selected", false);
		});

		panels.forEach((panel) => {
			panel.classList.remove("selected");
		});
		event.target.setAttribute("aria-selected", true);
		panels[i].classList.add("selected");
	});
	tabs[i].addEventListener("keydown", (event) => {
		if (event.key === "ArrowDown") {
			lastFocussed = document.activeElement;
			tabComponent.querySelector("div[role='tabpanel'].selected").focus();
		} else if (
			event.key === "ArrowLeft" &&
			document.activeElement.previousElementSibling
		) {
			document.activeElement.previousElementSibling.focus();
		} else if (
			event.key === "ArrowRight" &&
			document.activeElement.nextElementSibling
		) {
			document.activeElement.nextElementSibling.focus();
		}
	});

	// key up does not work if nvda is running
	// other screenreader are not tested
	panels[i].addEventListener("keydown", (event) => {
		if (event.key === "ArrowUp") {
			lastFocussed ? lastFocussed.focus() : null;
		}
	});
}
