
// Marvel character data
const characters = [
    { name: "The Beyonder", powerLevel: 10000, image: "the-beyonder.jpg" },
    { name: "Living Tribunal", powerLevel: 9500, image: "living-tribunal.jpg" },
    { name: "Phoenix", powerLevel: 6000, image: "phoenix.jpg" },
    { name: "Galactus", powerLevel: 5700, image: "galactus.jpg" },
    { name: "Uatu the Watcher", powerLevel: 5640, image: "uatu-the-watcher.jpg" },
    { name: "Silver Surfer", powerLevel: 5300, image: "silver-surfer.jpg" },
    { name: "Franklin Richards", powerLevel: 5120, image: "franklin-richards.jpg" },
    { name: "Sentry", powerLevel: 5010, image: "sentry.jpg" },
    { name: "Scarlet Witch", powerLevel: 4670, image: "scarlet-witch.jpg" },
    { name: "Molecule Man", powerLevel: 4560, image: "molecule-man.jpg" },
    { name: "Doctor Doom", powerLevel: 4430, image: "doctor-doom.jpg" },
    { name: "Doctor Strange", powerLevel: 4210, image: "doctor-strange.jpg" },
    { name: "Thanos", powerLevel: 4030, image: "thanos.jpg" },
    { name: "Hulk", powerLevel: 3740, image: "hulk.jpg" },
    { name: "Thor", powerLevel: 3540, image: "thor.jpg" },
    { name: "Black Bolt", powerLevel: 3390, image: "black-bolt.jpg" },
    { name: "Beta Ray Bill", powerLevel: 3190, image: "beta-ray-bill.jpg" },
    { name: "Professor X", powerLevel: 3020, image: "professor-x.jpg" },
    { name: "Captain Marvel", powerLevel: 2880, image: "captain-marvel.jpg" },
    { name: "Vision", powerLevel: 2630, image: "vision.jpg" },
    { name: "Emma Frost", powerLevel: 2490, image: "emma-frost.jpg" },
    { name: "Storm", powerLevel: 2320, image: "storm.jpg" },
    { name: "Ultron", powerLevel: 2160, image: "ultron.jpg" },
    { name: "Ghost Rider", powerLevel: 1930, image: "ghost-rider.jpg" },
    { name: "Man-Thing", powerLevel: 1870, image: "man-thing.jpg" },
    { name: "Rogue", powerLevel: 1440, image: "rogue.jpg" },
    { name: "Iceman", powerLevel: 1330, image: "iceman.jpg" },
    { name: "Invisible Woman", powerLevel: 1260, image: "invisible-woman.jpg" },
    { name: "Reed Richards", powerLevel: 1070, image: "reed-richards.jpg" },
    { name: "Iron Lad", powerLevel: 1020, image: "iron-lad.jpg" },
    { name: "Iron Man", powerLevel: 970, image: "iron-man.jpg" },
    { name: "Human Torch", powerLevel: 890, image: "human-torch.jpg" },
    { name: "The Thing", powerLevel: 870, image: "the-thing.jpg" },
    { name: "Spider-Man", powerLevel: 840, image: "spider-man.jpg" },
    { name: "Miles Morales", powerLevel: 830, image: "miles-morales.jpg" },
    { name: "Lockjaw", powerLevel: 800, image: "lockjaw.jpg" },
    { name: "Cyclops", powerLevel: 780, image: "cyclops.jpg" },
    { name: "Wolverine", powerLevel: 680, image: "wolverine.jpg" },
    { name: "Green Goblin", powerLevel: 650, image: "green-goblin.jpg" },
    { name: "Beast", powerLevel: 620, image: "beast.jpg" },
    { name: "Deadpool", powerLevel: 550, image: "deadpool.jpg" },
    { name: "Blade", powerLevel: 520, image: "blade.jpg" },
    { name: "Black Panther", powerLevel: 500, image: "black-panther.jpg" },
    { name: "Captain America", powerLevel: 460, image: "captain-america.jpg" },
    { name: "Nightcrawler", powerLevel: 420, image: "nightcrawler.jpg" },
    { name: "Winter Soldier", powerLevel: 410, image: "winter-soldier.jpg" },
    { name: "Gambit", powerLevel: 400, image: "gambit.jpg" },
    { name: "Daredevil", powerLevel: 340, image: "daredevil.jpg" },
    { name: "Hawkeye", powerLevel: 240, image: "hawkeye.jpg" },
    { name: "Punisher", powerLevel: 200, image: "punisher.jpg" },
    { name: "Nick Fury", powerLevel: 180, image: "nick-fury.jpg" },
    { name: "Uncle Ben", powerLevel: 20, image: "uncle-ben.jpg" }
];


let remainingCharacters = [...characters];

let currentCharacter = null;
let nextCharacter = null;
let score = 0;
let gameOver = false;
let usedStones = new Set();
let realityRevealed = false;
let doubleNextPoint = false;
let lastTurnState = null;
let soulProtection = false;

// Infinity Stone unlock requirements and descriptions
const infinityStones = [
    {
        id: "spaceStone",
        unlockScore: 3,
        description: "Skip the current matchup without losing points."
    },
    {
        id: "mindStone",
        unlockScore: 6,
        description: "Get a clue about the next character's power level."
    },
    {
        id: "realityStone",
        unlockScore: 10,
        description: "Reveal the next character's power level."
    },
    {
        id: "powerStone",
        unlockScore: 15,
        description: "Double the points earned on your next correct guess."
    },
    {
        id: "timeStone",
        unlockScore: 21,
        description: "Undo your last incorrect guess."
    },
    {
        id: "soulStone",
        unlockScore: 28,
        description: "Protect yourself from one incorrect guess."
    }
];

// Update which stones are unlocked and display their descriptions
function updateStoneDisplay() {
    infinityStones.forEach(stone => {
        const button = document.getElementById(stone.id);
        button.removeAttribute("title");
        const unlocked = score >= stone.unlockScore;
        const used = usedStones.has(stone.id);

        button.classList.toggle("locked", !unlocked);
        button.classList.toggle("unlocked", unlocked && !used);
        button.classList.toggle("used", used);

        button.disabled = !unlocked || used;

        // Only show the custom tooltip when unlocked
        button.dataset.tooltip = unlocked ? stone.description : "";
    });
}

// Space Stone: Skip the current matchup
function useSpaceStone() {
    if (score < 3 || usedStones.has("spaceStone") || gameOver) {
        return;
    }

    if (!currentCharacter || !nextCharacter) {
        return;
    }

    currentCharacter = nextCharacter;
    nextCharacter = getNextCharacter();

    usedStones.add("spaceStone");

    updateStoneDisplay();
    updateDisplay();

    document.getElementById("gameMessage").textContent =
        "Space Stone activated! Matchup skipped.";

    if (!nextCharacter) {
        gameOver = true;
        saveHighScore(score);

        document.getElementById("nextPowerLevel").textContent = "---";
        document.getElementById("finalScore").textContent = score;
        document.getElementById("gameOverScreen").style.display = "block";
        document.getElementById("higherButton").disabled = true;
        document.getElementById("lowerButton").disabled = true;
    }
}

// Mind Stone: Give an automatic power-level hint
function useMindStone() {
    if (score < 6 || usedStones.has("mindStone") || gameOver) {
        return;
    }

    if (!currentCharacter || !nextCharacter) {
        return;
    }

    const currentPower = currentCharacter.powerLevel;
    const nextPower = nextCharacter.powerLevel;
    const difference = Math.abs(nextPower - currentPower);

    let hint;

    if (difference >= 200) {
        hint = nextPower > currentPower
            ? "A significant power increase is approaching..."
            : "A significant power decrease is approaching...";
    } else {
        hint = "The next matchup is closer than you think...";
    }

    usedStones.add("mindStone");

    updateStoneDisplay();

    document.getElementById("gameMessage").textContent =
        "Mind Stone: " + hint;
}

// Reality Stone: Reveal the next character's power level
// Reality Stone: Reveal the next character's power level
function useRealityStone() {
    if (score < 10 || usedStones.has("realityStone") || gameOver) {
        return;
    }

    if (!currentCharacter || !nextCharacter) {
        return;
    }

    document.getElementById("nextPowerLevel").textContent =
        nextCharacter.powerLevel;

    usedStones.add("realityStone");

    updateStoneDisplay();

    document.getElementById("gameMessage").textContent =
        "Reality Stone activated! The next character's power level has been revealed.";
}

// Power Stone: Double points on the next correct guess
function usePowerStone() {
    if (score < 15 || usedStones.has("powerStone") || gameOver) {
        return;
    }

    usedStones.add("powerStone");
    doubleNextPoint = true;

    updateStoneDisplay();

    document.getElementById("gameMessage").textContent =
        "Power Stone activated! Your next correct guess is worth 2 points.";
}

// Time Stone: Undo the last incorrect guess
function useTimeStone() {
    if (score < 21 || usedStones.has("timeStone") || !gameOver || !lastTurnState) {
        return;
    }

    currentCharacter = lastTurnState.currentCharacter;
    nextCharacter = lastTurnState.nextCharacter;
    remainingCharacters = [...lastTurnState.remainingCharacters];
    score = lastTurnState.score;

    gameOver = false;

    usedStones.add("timeStone");
    lastTurnState = null;

    document.getElementById("gameOverScreen").style.display = "none";
    document.getElementById("higherButton").disabled = false;
    document.getElementById("lowerButton").disabled = false;
    document.getElementById("gameMessage").textContent =
        "Time Stone activated! Your last incorrect guess has been undone.";

    updateStoneDisplay();
    updateDisplay();
}
function useSoulStone() {
    if (score < 28 || usedStones.has("soulStone") || gameOver) return;

    usedStones.add("soulStone");
    soulProtection = true;

    updateStoneDisplay();

    document.getElementById("gameMessage").textContent =
        "Soul Stone activated! Your next incorrect guess will be protected.";
}
// Get a random character without repeating characters
function getNextCharacter() {
    if (remainingCharacters.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * remainingCharacters.length);

    return remainingCharacters.splice(randomIndex, 1)[0];
}

// Choose the starting character
function startGame() {
    remainingCharacters = [...characters];

    // Randomly select the starting character
    const randomIndex = Math.floor(Math.random() * remainingCharacters.length);
    currentCharacter = remainingCharacters.splice(randomIndex, 1)[0];

    // Select the next character
    nextCharacter = getNextCharacter();
}

lastTurnState = {
    currentCharacter,
    nextCharacter,
    remainingCharacters: [...remainingCharacters],
    score
};


// Check the player's guess
function checkGuess(currentCharacter, nextCharacter, guess) {
    if (nextCharacter === null) {
        return {
            correct: false,
            message: "No more characters!"
        };
    }

    const currentPower = currentCharacter.powerLevel;
    const nextPower = nextCharacter.powerLevel;

    if (guess === "higher") {
        return {
            correct: nextPower > currentPower,
            message: nextPower > currentPower ? "Correct!" : "Incorrect!"
        };
    }

    if (guess === "lower") {
        return {
            correct: nextPower < currentPower,
            message: nextPower < currentPower ? "Correct!" : "Incorrect!"
        };
    }

    return {
        correct: false,
        message: "Invalid guess."
    };
}

// Initialize a new game
function initializeGame() {
    score = 0;
    gameOver = false;
    usedStones.clear();
    lastTurnState = null;

    startGame();

    updateStoneDisplay();

    return {
        currentCharacter,
        nextCharacter,
        score,
        gameOver
    };
}

// Process the player's guess
function submitGuess(guess) {
    if (gameOver || !currentCharacter || !nextCharacter) {
        return null;
    }
lastTurnState = {
    currentCharacter,
    nextCharacter,
    remainingCharacters: [...remainingCharacters],
    score
};
    const result = checkGuess(currentCharacter, nextCharacter, guess);

   if (!result.correct) {
    if (soulProtection) {
        soulProtection = false;
        updateStoneDisplay();

        return {
            ...result,
            protected: true,
            score,
            gameOver: false,
            currentCharacter,
            nextCharacter
        };
    }

    gameOver = true;

    return {
            ...result,
            score,
            gameOver,
            currentCharacter,
            nextCharacter
        };
    }

if (doubleNextPoint) {
    score += 2;
    doubleNextPoint = false;
} else {
    score++;
}
    updateStoneDisplay();

    currentCharacter = nextCharacter;
    nextCharacter = getNextCharacter();

    if (!nextCharacter) {
        gameOver = true;
    }

    return {
        ...result,
        score,
        gameOver,
        currentCharacter,
        nextCharacter
    };
}

// Display the current game state
function updateDisplay() {
    document.getElementById("currentCharacterName").textContent =
        currentCharacter.name;

    document.getElementById("currentPowerLevel").textContent =
        currentCharacter.powerLevel;

    document.getElementById("currentCharacterImage").src =
        "images/marvel/" + currentCharacter.image;

    document.getElementById("nextCharacterName").textContent =
        nextCharacter ? nextCharacter.name : "No More Characters";

    document.getElementById("nextPowerLevel").textContent = "?";

    document.getElementById("nextCharacterImage").src =
        nextCharacter ? "images/marvel/" + nextCharacter.image : "";

    document.getElementById("score").textContent = score;
}

// Handle a player's guess
function handleGuess(guess) {
    const result = submitGuess(guess);

    if (!result) {
        return;
    }

    if (result.gameOver) {
        saveHighScore(result.score);

        updateDisplay();

        document.getElementById("nextPowerLevel").textContent =
            result.nextCharacter ? result.nextCharacter.powerLevel : "---";

        document.getElementById("finalScore").textContent = result.score;

        document.getElementById("gameOverScreen").style.display = "block";

        if (!result.correct) {
            const nextCard = document
                .getElementById("nextCharacterImage")
                .closest(".character-card");

            nextCard.classList.remove("incorrect");

            void nextCard.offsetWidth;

            nextCard.classList.add("incorrect");
        }

        document.getElementById("higherButton").disabled = true;
        document.getElementById("lowerButton").disabled = true;

        document.getElementById("gameMessage").textContent = "";

    } else {
        updateDisplay();

        const currentCard = document
            .getElementById("currentCharacterImage")
            .closest(".character-card");

        currentCard.classList.remove("reveal");

        void currentCard.offsetWidth;

        currentCard.classList.add("reveal");
    }
}

// Restart the game
function restartGame() {
    document.body.classList.remove("intro-screen");

    initializeGame();

    document.getElementById("gameMessage").textContent = "";
    document.getElementById("gameOverScreen").style.display = "none";

    document.getElementById("higherButton").disabled = false;
    document.getElementById("lowerButton").disabled = false;

    document.getElementById("restartButton").textContent = "Restart Game";

    document.querySelectorAll(".character-card").forEach(card => {
        card.classList.remove("reveal", "incorrect");
    });

    updateDisplay();
}

// Connect guessing buttons
document.getElementById("higherButton").addEventListener("click", function () {
    handleGuess("higher");
});

document.getElementById("lowerButton").addEventListener("click", function () {
    handleGuess("lower");
});

// Connect Start Game and Play Again buttons
document.getElementById("restartButton").addEventListener("click", restartGame);
document.getElementById("playAgainButton").addEventListener("click", restartGame);

// Connect Infinity Stone buttons
document.getElementById("spaceStone").addEventListener("click", useSpaceStone);
document.getElementById("mindStone").addEventListener("click", useMindStone);
document.getElementById("realityStone").addEventListener("click", useRealityStone);
document.getElementById("powerStone").addEventListener("click", usePowerStone);
document.getElementById("timeStone").addEventListener("click", useTimeStone);
document.getElementById("soulStone").addEventListener("click", useSoulStone);
// Retrieve the all-time high score from MongoDB
async function loadHighScore() {
    try {
        const response = await fetch("/api/highscore");

        if (!response.ok) {
            throw new Error("Could not retrieve high score");
        }

        const data = await response.json();

        document.getElementById("highScore").textContent = data.highScore;

    } catch (error) {
        console.error("Error loading high score:", error);
    }
}

// Save the score if it beats the existing high score
async function saveHighScore(score) {
    try {
        const response = await fetch("/api/highscore", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ score })
        });

        if (!response.ok) {
            throw new Error("Could not save high score");
        }

        const data = await response.json();

        document.getElementById("highScore").textContent = data.highScore;

    } catch (error) {
        console.error("Error saving high score:", error);
    }
}

// Load the high score when the page opens
loadHighScore();
