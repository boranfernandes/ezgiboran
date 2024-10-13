const gameArea = document.getElementById('gameArea');

// Rastgele mesajlar içeren dizi
const messages = [
    "İyiki Doğmuşsunnn",
    "İyiki Benimsinnn",
    "Biz Diğerleri Gibi Olmayalım Hiç Ayrılmayalımmm"
];

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomMessage() {
    return messages[Math.floor(Math.random() * messages.length)];
}

function createBalon() {
    const balon = document.createElement('div');
    balon.classList.add('balon');
    balon.style.left = Math.random() * (gameArea.clientWidth - 50) + 'px';
    balon.style.bottom = '0px';
    balon.style.backgroundColor = getRandomColor();

    const ip = document.createElement('div');
    ip.classList.add('ip');

    balon.appendChild(ip); // İpi balona ekliyoruz

    const img = document.createElement('img');
    img.src = 'ezgi1.jpg'; // Resmin URL'sini buraya yazabilirsiniz
    img.alt = 'Balon Resmi';
    balon.appendChild(img); // Resmi balona ekliyoruz

    balon.addEventListener('click', function() {
        showExplosion(balon); // Patlama efektini göster
        balon.style.transform = 'scale(0)';
        showMessage(getRandomMessage(), balon); // Rastgele mesaj göster
        setTimeout(() => {
            balon.remove();
        }, 500); // Patlama ve mesaj süresiyle uyumlu olması için
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

function showExplosion(balon) {
    const explosion = document.createElement('div');
    explosion.classList.add('patlama.png');
    explosion.style.left = balon.offsetLeft - 15 + 'px'; // Patlama pozisyonu
    explosion.style.top = balon.offsetTop - 15 + 'px'; // Patlama pozisyonu
    gameArea.appendChild(explosion);

    // Patlama efektinin kaybolmasını sağla
    setTimeout(() => {
        explosion.remove();
    }, 500); // 0.5 saniye sonra patlama efekti kaybolur
}

function showMessage(message, balon) {
    const msgElement = document.createElement('div');
    msgElement.textContent = message;
    msgElement.style.position = 'absolute';
    msgElement.style.top = (balon.offsetTop - 50) + 'px'; // Mesaj balonun üstünde
    msgElement.style.left = balon.offsetLeft + 'px';
    msgElement.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    msgElement.style.color = '#FF69B4'; // Pembemsi bir yazı rengi
    msgElement.style.fontSize = '16px';
    msgElement.style.fontWeight = 'bold';
    msgElement.style.padding = '10px';
    msgElement.style.borderRadius = '5px';
    msgElement.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    msgElement.style.zIndex = '1';
    msgElement.style.opacity = '0'; // Başlangıçta görünmez
    msgElement.style.transition = 'opacity 0.5s';
    gameArea.appendChild(msgElement);

    setTimeout(() => {
        msgElement.style.opacity = '1';
    }, 10);

    setTimeout(() => {
        msgElement.style.opacity = '0';
    }, 1000);

    setTimeout(() => {
        msgElement.remove();
    }, 1500);
}

setInterval(createBalon, 1000);
