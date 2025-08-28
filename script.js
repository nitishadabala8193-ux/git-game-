class TicTacToe {
    constructor() {
        this.currentPlayer = 'X';
        this.gameBoard = ['', '', '', '', '', '', '', '', ''];
        this.gameActive = true;
        this.scores = { X: 0, O: 0 };
        
        this.initializeGame();
    }

    initializeGame() {
        this.cells = document.querySelectorAll('.cell');
        this.statusDisplay = document.getElementById('status');
        this.scoreDisplay = document.getElementById('score');
        this.resetButton = document.getElementById('reset-btn');

        this.cells.forEach(cell => {
            cell.addEventListener('click', this.handleCellClick.bind(this));
        });

        this.resetButton.addEventListener('click', this.resetGame.bind(this));

        this.updateStatus();
        this.updateScore();
    }

    handleCellClick(event) {
        const clickedCell = event.target;
        const cellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

        if (this.gameBoard[cellIndex] !== '' || !this.gameActive) {
            return;
        }

        this.gameBoard[cellIndex] = this.currentPlayer;
        clickedCell.textContent = this.currentPlayer;
        clickedCell.classList.add(this.currentPlayer.toLowerCase());

        if (this.checkWin()) {
            this.handleGameEnd(`${this.currentPlayer} Wins!`);
            this.scores[this.currentPlayer]++;
            this.updateScore();
        } else if (this.checkDraw()) {
            this.handleGameEnd("It's a Draw!");
        } else {
            this.switchPlayer();
            this.updateStatus();
        }
    }

    checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (this.gameBoard[a] && 
                this.gameBoard[a] === this.gameBoard[b] && 
                this.gameBoard[a] === this.gameBoard[c]) {
                
                // Highlight winning cells
                pattern.forEach(index => {
                    this.cells[index].classList.add('winner');
                });
                
                return true;
            }
        }
        return false;
    }

    checkDraw() {
        return !this.gameBoard.includes('') && !this.checkWin();
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    updateStatus() {
        this.statusDisplay.textContent = `Player ${this.currentPlayer}'s Turn`;
    }

    updateScore() {
        this.scoreDisplay.textContent = `X: ${this.scores.X} | O: ${this.scores.O}`;
    }

    handleGameEnd(message) {
        this.statusDisplay.textContent = message;
        this.gameActive = false;
    }

    resetGame() {
        this.currentPlayer = 'X';
        this.gameBoard = ['', '', '', '', '', '', '', '', ''];
        this.gameActive = true;

        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winner');
        });

        this.updateStatus();
    }
}

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});