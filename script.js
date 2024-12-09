const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const bird = {
    x: 50,
    y: 256,
    radius: 12,
    velocity: 0,
    gravity: 0.25,
    jump: 4.6,
};

const pipes = [];
pipes[0] = {
    x: canvas.width,
    y: 0,
};

let score = 0;
let gameOver = false;

function draw() {
    ctx.fillStyle = '#70c5ce';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < pipes.length; i++) {
        ctx.fillStyle = '#008000';
        ctx.fillRect(pipes[i].x, pipes[i].y, 50, pipes[i].y);
        ctx.fillRect(pipes[i].x, pipes[i].y + 200, 50, canvas.height - pipes[i].y - 200);

        pipes[i].x--;

        if (pipes[i].x === 125) {
            pipes.push({
                x: canvas.width,
                y: Math.floor(Math.random() * (canvas.height - 200))
            });
        }

        // Collision detection
        if (
            bird.x + bird.radius > pipes[i].x &&
            bird.x - bird.radius < pipes[i].x + 50 &&
            (bird.y - bird.radius < pipes[i].y ||
             bird.y + bird.radius > pipes[i].y + 200) ||
            bird.y + bird.radius > canvas.height ||
            bird.y - bird.radius < 0
        ) {
            gameOver = true;
        }

        if (pipes[i].x === 0) {
            score++;
        }
    }

    ctx.fillStyle = '#FFFF00';
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
    ctx.fill();

    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    if (bird.y + bird.radius > canvas.height) {
        bird.y = canvas.height - bird.radius;
        gameOver = true;
    }

    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);

    if (gameOver) {
        ctx.font = '30px Arial';
        ctx.fillText('Game Over!', 50, 256);
    } else {
        requestAnimationFrame(draw);
    }
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !gameOver) {
        bird.velocity = -bird.jump;
    }
    if (event.code === 'Space' && gameOver) {
        // Reset the game
        bird.y = 256;
        bird.velocity = 0;
        pipes.length = 0;
        pipes[0] = {
            x: canvas.width,
            y: 0,
        };
        score = 0;
        gameOver = false;
        draw();
    }
});

draw();
