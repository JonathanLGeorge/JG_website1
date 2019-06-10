const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20,20);

const colors = [
	null,
	'#FF0D72',
	'#0DC2FF',
	'#0DFF72',
	'#F538FF',
	'#FF8E0D',
	'#FFE138',
	'#3877FF',
];

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

//this is how the peices are managed on screen
function createMatrix(w, h) {
	const matrix = [];
	while (h--) {
		matrix.push(new Array(w).fill(0));
	}
	return matrix;
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


function draw(){
	context.fillStyle = '#000';
	context.fillRect(0,0, canvas.width, canvas.height);
	drawMatrix(arena, {x: 0, y: 0});
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



// we dont want another drop to happen, resets drop timer
function playerDrop(){
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
	const pieces = 'TJLOSZI';
	player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
	player.pos.y = 0;
	player.pos.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);
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

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;
function update(time = 0){
	const deltaTime = time - lastTime;
	
	dropCounter += deltaTime;
	if (dropCounter > dropInterval) {
		playerDrop();
	}
	
	lastTime = time;
	
	//console.log(deltaTime);
	draw();
	requestAnimationFrame(update); 
}


function updateScore() {
	document.getElementById('score').innerText = player.score;
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

//logging the play area
const arena = createMatrix(12, 20);//{
	//console.log(arena), console.table(arena);
//}

const player = {
	pos: {X: 0, y: 0},
	matrix: null,
	score: 0;
};

playerReset();
updateScore();
update();