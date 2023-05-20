//your JS code here. If required.
document.addEventListener('DOMContentLoaded', function() {
  const player1Input = document.getElementById('player-1');
  const player2Input = document.getElementById('player-2');
  const submitBtn = document.getElementById('submit');
  const gameContainer = document.getElementById('game');
  const messageDiv = document.querySelector('.message');
  const cells = document.querySelectorAll('.cell');

  let currentPlayer;
  let board;
  let gameEnded;

  submitBtn.addEventListener('click', function() {
    const player1Name = player1Input.value;
    const player2Name = player2Input.value;

    if (player1Name.trim() === '' || player2Name.trim() === '') {
      alert('Please enter names for both players');
      return;
    }

    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameEnded = false;

    messageDiv.textContent = `${player1Name}, you're up`;

    player1Input.disabled = true;
    player2Input.disabled = true;
    submitBtn.disabled = true;
    gameContainer.style.display = 'block';
  });

  cells.forEach(function(cell) {
    cell.addEventListener('click', function() {
      const cellIndex = parseInt(cell.id) - 1;

      if (board[cellIndex] === '' && !gameEnded) {
        board[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);

        if (checkWin()) {
          messageDiv.textContent = `${getPlayerName(currentPlayer)}, congratulations you won!`;
          gameEnded = true;
        } else if (checkDraw()) {
          messageDiv.textContent = 'It\'s a draw!';
          gameEnded = true;
        } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          messageDiv.textContent = `${getPlayerName(currentPlayer)}, you're up`;
        }
      }
    });
  });

  function checkWin() {
    const winCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (let combination of winCombinations) {
      const [a, b, c] = combination;
      if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
        highlightWinningCells([a, b, c]);
        return true;
      }
    }

    return false;
  }

  function highlightWinningCells(cellsToHighlight) {
    cellsToHighlight.forEach(function(cellIndex) {
      cells[cellIndex].classList.add('winning-cell');
    });
  }

  function checkDraw() {
    return board.every(function(cell) {
      return cell !== '';
    });
  }

  function getPlayerName(playerSymbol) {
    return playerSymbol === 'X' ? player1Input.value : player2Input.value;
  }
});
