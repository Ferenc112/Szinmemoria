const gameState = {
    sequence: [],
    playerSequence: [],
    level: 1,
    gameActive: false,
    isPlayingSequence: false
};

const colors = ['piros', 'kek', 'zold', 'sarga'];

const gameBoard = document.getElementById('game-board');
const startButton = document.querySelector('.gomb');
const levelDisplay = document.getElementById('pont');


function init() {
    startButton.addEventListener('click', startGame);
    colors.forEach(color => {
        const element = document.querySelector(`.${color}`);
        element.addEventListener('click', () => handleColorClick(color));
    });
}

// Játék indítása
function startGame() {
    gameState.sequence = [];
    gameState.playerSequence = [];
    gameState.level = 1;
    gameState.gameActive = true;
    updateLevelDisplay();
    startButton.textContent = 'Játékban...';
    startButton.disabled = true;
    
    addToSequence();
}

function addToSequence() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];
    gameState.sequence.push(randomColor);
    gameState.playerSequence = [];
    
    
    setTimeout(() => {
        playSequence();
    }, 1000);
}


async function playSequence() {
    gameState.isPlayingSequence = true;
    
    for (let i = 0; i < gameState.sequence.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 600));
        flashColor(gameState.sequence[i]);
    }
    
    gameState.isPlayingSequence = false;
}

// Szín villogtatása
function flashColor(color) {
    const element = document.querySelector(`.${color}`);
    element.style.opacity = '0.1';
    
    setTimeout(() => {
        element.style.opacity = '1';
    }, 300);
}

// Szín kattintás kezelő
function handleColorClick(color) {
    if (gameState.isPlayingSequence || !gameState.gameActive) {
        return;
    }
    
    // Vizuális visszajelzés
    const element = document.querySelector(`.${color}`);
    element.style.opacity = '0.7';
    setTimeout(() => {
        element.style.opacity = '1';
    }, 200);
    
    gameState.playerSequence.push(color);
    
    // Ellenőrzés
    checkPlayerInput();
}

// Játékos bemenete ellenőrzése
function checkPlayerInput() {
    const currentIndex = gameState.playerSequence.length - 1;
    
    // Nem egyezik a szín
    if (gameState.playerSequence[currentIndex] !== gameState.sequence[currentIndex]) {
        endGame();
        return;
    }
    
    // A sorozat teljes
    if (gameState.playerSequence.length === gameState.sequence.length) {
        gameState.level++;
        updateLevelDisplay();
        
        // Új kör előkészítése
        setTimeout(() => {
            addToSequence();
        }, 1000);
    }
}

// Szint kijelző frissítése
function updateLevelDisplay() {
    levelDisplay.textContent = `Szint: ${gameState.level}`;
}

// Játék vége
function endGame() {
    gameState.gameActive = false;
    startButton.disabled = false;
    startButton.textContent = 'Újra kezd';
    
    alert(`Játék vége!\nElért szint: ${gameState.level}`);
}

init();