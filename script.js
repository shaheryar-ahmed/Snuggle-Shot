document.getElementById('y').textContent = new Date().getFullYear();

// Confetti effect
function triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const colors = ['#ff7aa2', '#7cc3ff', '#ffe6cf', '#daf7f1', '#ffd8e5'];

    // Create particles
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            radius: Math.random() * 10 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            speed: Math.random() * 8 + 2,
            angle: Math.random() * Math.PI * 2,
            friction: 0.95,
            gravity: 0.2
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, index) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();

            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed + p.gravity;
            p.speed *= p.friction;
            p.gravity += 0.1;
            p.radius -= 0.05;

            // Remove particles that are off-screen or too small
            if (p.y > canvas.height || p.radius <= 0) {
                particles.splice(index, 1);
            }
        });

        if (particles.length > 0) {
            requestAnimationFrame(draw);
        }
    }

    draw();

    // Remove canvas after animation completes
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 3000);
}

// Make confetti responsive
window.addEventListener('resize', function () {
    const canvas = document.getElementById('confetti-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
