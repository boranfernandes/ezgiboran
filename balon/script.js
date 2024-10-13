const gameArea = document.getElementById('gameArea');

function createBalon() {
    const balon = document.createElement('div');
    balon.classList.add('balon');
    balon.style.left = Math.random() * (gameArea.clientWidth - 50) + 'px';
    balon.style.bottom = '0px';

    balon.addEventListener('click', function() {
        balon.style.transform = 'scale(0)';
        setTimeout(() => {
            balon.remove();
        }, 200);
    });

    gameArea.appendChild(balon);
    moveBalon(balon);
}

function moveBalon(balon) {
    let bottom = 0;
    const interval = setInterval(() => {
        bottom += 2;
        balon.style.bottom = bottom + 'px';

        if (bottom > gameArea.clientHeight) {
            clearInterval(interval);
            balon.remove();
        }
    }, 50);
}

setInterval(createBalon, 1000);
