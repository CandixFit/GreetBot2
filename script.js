let currentStep = 0;
let userName = "";

function startGreeting() {
  const inputField = document.getElementById("nameInput");
  const output = document.getElementById("greetingOutput");
  const button = document.querySelector("button");
  const input = inputField.value.trim();

  if (currentStep === 0) {
    if (!input || /\d/.test(input)) {
      output.innerHTML = '<span class="bot-line">Bitte gib einen gültigen Namen ohne Zahlen ein.</span>';
      return;
    }
    if (input.length > 30) {
      output.innerHTML = '<span class="bot-line">Dein Name darf maximal 30 Zeichen haben.</span>';
      return;
    }
    userName = input;
    typeMessage(`Hallo ${userName}! Wie geht es dir heute? (z. B. gut, okay, schlecht)`, output);
    inputField.value = "";
    inputField.placeholder = "Wie fühlst du dich heute?";
    inputField.maxLength = 100;
    button.textContent = "Absenden";
    currentStep = 1;
  } else if (currentStep === 1) {
    if (input.length > 100) {
      output.innerHTML = '<span class="bot-line">Bitte bleibe unter 100 Zeichen.</span>';
      return;
    }

    let response = interpretMood(input.toLowerCase());
    typeMessage(response, output);
    inputField.value = "";
    inputField.style.display = "none"; // Eingabefeld ausblenden
    button.textContent = "Aktualisieren";
    button.onclick = () => location.reload(); // Seite neu laden
    currentStep = 2;
  }
}

function interpretMood(mood) {
  if (mood.includes("gut")) {
    return `🤖 Das freut mich sehr, ${userName}! Ein guter Tag! 😊`;
  } else if (mood.includes("okay") || mood.includes("geht")) {
    return `🤖 Verstanden, ${userName}. Man kann nicht immer 100 % sein. ✌️`;
  } else if (mood.includes("schlecht") || mood.includes("nicht")) {
    return `🤖 Oh nein, ${userName}! Ich hoffe, es wird bald besser! 😔`;
  } else {
    return `🤖 Danke für deine Antwort, ${userName}. Ich bin immer hier, wenn du reden willst. 🤗`;
  }
}

function typeMessage(text, container) {
  container.innerHTML = "";
  const line = document.createElement("span");
  line.classList.add("bot-line");
  container.appendChild(line);

  let i = 0;
  const typing = setInterval(() => {
    if (i < text.length) {
      line.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typing);
    }
  }, 50);
}
