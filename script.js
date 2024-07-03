document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        { name: 'A', img: 'A' },
        { name: 'A', img: 'A' },
        { name: 'B', img: 'B' },
        { name: 'B', img: 'B' },
        { name: 'C', img: 'C' },
        { name: 'C', img: 'C' },
        { name: 'D', img: 'D' },
        { name: 'D', img: 'D' },
        { name: 'E', img: 'E' },
        { name: 'E', img: 'E' },
        { name: 'F', img: 'F' },
        { name: 'F', img: 'F' },
        { name: 'G', img: 'G' },
        { name: 'G', img: 'G' },
        { name: 'H', img: 'H' },
        { name: 'H', img: 'H' }
    ];

    cardArray.sort(() => 0.5 - Math.random());

    const gameBoard = document.getElementById('game-board');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    function createBoard() {
        gameBoard.innerHTML = ''; // Clear game board

        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.id = i;
            card.addEventListener('click', flipCard);

            const cardFront = document.createElement('div');
            cardFront.classList.add('card-front');
            cardFront.textContent = cardArray[i].img;

            const cardBack = document.createElement('div');
            cardBack.classList.add('card-back');

            card.appendChild(cardFront);
            card.appendChild(cardBack);
            gameBoard.appendChild(card);
        }
    }

    function checkForMatch() {
        const [optionOneId, optionTwoId] = cardsChosenId;
        const cards = document.querySelectorAll('.card');

        if (cardsChosen[0] === cardsChosen[1]) {
            disableCards(cards, optionOneId, optionTwoId);
            cardsWon.push(cardsChosen);
        } else {
            unflipCards(cards, optionOneId, optionTwoId);
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardArray.length / 2) {
            setTimeout(() => showCongratulations(), 300); // Show congratulations with quicker transition
        }
    }

    function flipCard() {
        const cardId = this.dataset.id;
        if (cardsChosenId.length < 2 && !cardsChosenId.includes(cardId)) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            this.classList.add('flip');

            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 300); // Quicker transition for checking match
            }
        }
    }

    function disableCards(cards, id1, id2) {
        cards[id1].removeEventListener('click', flipCard);
        cards[id2].removeEventListener('click', flipCard);
    }

    function unflipCards(cards, id1, id2) {
        setTimeout(() => {
            cards[id1].classList.remove('flip');
            cards[id2].classList.remove('flip');
        }, 500); // Quicker flip back animation delay
    }

    function showCongratulations() {
        const popUp = document.createElement('div');
        popUp.classList.add('popup');
        popUp.innerHTML = `
            <div class="popup-content">
                <h2>Good Job!</h2>
                <p>Congratulations! You found all the pairs.</p>
                <button id="play-again-btn">Play Again</button>
            </div>
        `;
        document.body.appendChild(popUp);

        // Attach event listener to the Play Again button
        const playAgainButton = document.getElementById('play-again-btn');
        playAgainButton.addEventListener('click', resetGame);
    }

    function resetGame() {
        const popUp = document.querySelector('.popup');
        if (popUp) {
            popUp.remove(); // Remove popup if it exists
        }

        gameBoard.innerHTML = ''; // Clear game board
        cardsChosen = []; // Reset cards chosen
        cardsChosenId = []; // Reset cards chosen IDs
        cardsWon = []; // Reset cards won array
        createBoard(); // Re-create game board
    }

    createBoard();
});