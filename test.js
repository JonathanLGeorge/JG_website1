/*
code tutorial help by Pontus Persson.  
*/
const canvas = document.getElementById('tetris'); //width = 240 height = 400
const context = canvas.getContext('2d');
const colors = [
    null,
    '#ff8c66',
    '#ffff66',
    '#66ffd9',
    '#6666ff',
    '#ff66ff',
    '#ff6666',
    '#0000ff',
	'#996633',
];

//timer for pieces to drop
let dropCounter = 0;
const DROPINTERVAL = 1000;
let lastTime = 0;
let level = 1;
//making the play feild 
const arena = createMatrix(12, 20);

const player = {
    pos: {x: 0, y: 0},
    matrix: null,
    score: 0,
};

context.scale(20, 20);

function arenaSweep() {
    let rowCount = 1;
    outer: for (let y = arena.length -1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
            if (arena[y][x] === 0) {
                continue outer;
            }
        }

        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;
		//score
        player.score += rowCount * 10;
        rowCount *= 2;
    }
}

function collide(arena, player) {
    const m = player.matrix;
    const o = player.pos;
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
               (arena[y + o.y] &&
                arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

//play feild
function createMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}


// each of the pieces
function createPiece(type){
	switch(type){
		case 'I':
			return [[0,1,0,0],
					[0,1,0,0],
					[0,1,0,0],
					[0,1,0,0],];
			break;
		
		case 'L':
			return [[0, 2, 0],
					[0, 2, 0],
					[0, 2, 2],];
			break;
		
		case 'J':
			return [[0, 3, 0],
					[0, 3, 0],
					[3, 3, 0],];
			break;
		
		case 'O':
			return [[4, 4],
					[4, 4],];
			break;
		
		case "Z":
			return [[5, 5, 0],
					[0, 5, 5],
					[0, 0, 0],];
			break;
		
		case "S":
			return [[0, 6, 6],
					[6, 6, 0],
					[0, 0, 0],];
			break;
		
		case 'T':
			return [[0, 7, 0],
					[7, 7, 7],
					[0, 0, 0],];
			break;
		
		case 'Q':
			return [[8, 5, 7],
					[3, 0, 6],
					[2, 1, 4],];
	}
}

function drawMatrix(matrix, offset) { 
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect(x + offset.x,
                                 y + offset.y,
                                 1, 1);
            }
        });
    });
}

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height); //w=240 h=400

    drawMatrix(arena, {x: 0, y: 0}); //arena =  12 x20
    drawMatrix(player.matrix, player.pos);
}

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
}

function rotate(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }

    if (dir > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

//drop piece
function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        updateScore();
    }
    dropCounter = 0; 
}

function playerMove(offset) {
    player.pos.x += offset;
    if (collide(arena, player)) {
        player.pos.x -= offset;
    }
}

function playerReset() {
    const PIECES = 'TJLOSZIQ';
    player.matrix = createPiece(PIECES[PIECES.length * Math.random() | 0]);
    player.pos.y = 0;
    player.pos.x = (arena[0].length / 2 | 0) -
                   (player.matrix[0].length / 2 | 0);
    if (collide(arena, player)) {
        arena.forEach(row => row.fill(0));
        player.score = 0;
        updateScore();
    }
}

function playerRotate(dir) {
    const pos = player.pos.x;
    let offset = 1;
    rotate(player.matrix, dir);
    while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix[0].length) {
            rotate(player.matrix, -dir);
            player.pos.x = pos;
            return;
        }
    }
}



//time and game loop
function update(time = 0) {
	const deltaTime = time - lastTime;

	dropCounter += deltaTime;
	if(level < 2){
		if (dropCounter > DROPINTERVAL) {
			playerDrop();
		
		}
	} else {
		if (dropCounter > DROPINTERVAL/2) {
			playerDrop();
		}
	}

	lastTime = time;

	draw();
	requestAnimationFrame(update);
}

function updateScore() {
    document.getElementById('score').innerText = player.score;
	if(player.score > 20){
		level++;
	}
}

//keyboard input //logs
document.addEventListener('keydown', event => {	
	switch(event.keyCode){
		case 65: //A left
			playerMove(-1);
		break;
		
		case 68: //D right
			playerMove(1);
		break;
		
		case 83: //S down
			playerDrop();
		break;
		
		case 81: //Q
			playerRotate(-1);
		break;
		
		case 87: //W
			playerRotate(1);
		break;
	}
});

document.querySelector('p').addEventListener('touchstart', f);
function f(ev){
    console.log(ev.touches);
}



playerReset();
updateScore();
update();