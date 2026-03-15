var board = null;
var game = new Chess();
var solution = [];
var moveIndex = 0;

function onDrop(source, target) {
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q'
    });

    if (move === null) return 'snapback';

    // Check if move matches the puzzle solution
    if (move.lan === solution[moveIndex]) {
        moveIndex++;
        // Computer plays the next move in the solution automatically
        if (moveIndex < solution.length) {
            setTimeout(() => {
                game.move(solution[moveIndex]);
                board.position(game.fen());
                moveIndex++;
            }, 500);
        } else {
            document.getElementById('status').innerText = "Checkmate! Well done.";
        }
    } else {
        game.undo();
        return 'snapback';
    }
}

$.getJSON('/get_puzzle', function(data) {
    game.load(data.fen);
    solution = data.moves.split(' ');
    board = Chessboard('myBoard', {
        draggable: true,
        position: data.fen,
        onDrop: onDrop
    });
});
