let isBotRunning = false;
let timeoutIds = [];
let cooldownActive = false;

document.getElementById("startBot").addEventListener("click", function() {
    const output = document.getElementById("botOutput");
    const button = this;

    if (cooldownActive) return;

    if (isBotRunning) {
        stopBot();
        output.innerHTML += `<p style="color: red;">Hey, do NOT interrupt meh!</p>`;
        startCooldown(button);
        return;
    }

    startBot(output, button);
});

function startBot(output, button) {
    isBotRunning = true;
    button.textContent = "Bot unterbrechen";
    output.innerHTML = "";

    let messages = [
        "Hi there!",
        "Welcome to my Place",
        `My name is GreetBot and I`,
        `I was once a piece of rock`,
        `then complex maths came..`,
        `Finally you stumbled over electricity`,
        `the first Calculator was born...`,
        `And now i´m trapped as long as this guy gets a job`,
        "So, who are you?",
        "Are you going to be my Redeemer!?",

    ];

    messages.forEach((msg, index) => {
        const id = setTimeout(() => {
            output.innerHTML += `<p>${msg}</p>`;

            if (index === messages.length - 1) {
                isBotRunning = false;
                document.getElementById("startBot").textContent = "Bot starten";

                // Namensabfrage nach der letzten Nachricht
                const name = prompt("Wie heißt du?");
                if (name) {
                    output.innerHTML += `<p><strong>🤖 Bot sagt:</strong> Hallo ${name}!</p>`;
                }
            }
        }, index * 1000); // Korrigiert: Jede Nachricht hat 1 Sekunde Abstand
        timeoutIds.push(id);
    });
}

function stopBot() {
    timeoutIds.forEach(id => clearTimeout(id));
    timeoutIds = [];
    isBotRunning = false;
    document.getElementById("startBot").textContent = "Bot starten";
}

function startCooldown(button) {
    cooldownActive = true;
    button.disabled = true;
    button.textContent = "Cooldown (5s)";

    const cooldownId = setTimeout(() => {
        button.disabled = false;
        button.textContent = "Bot starten";
        cooldownActive = false;
    }, 5000);
    timeoutIds.push(cooldownId);
}












