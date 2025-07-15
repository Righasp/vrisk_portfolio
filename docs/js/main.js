const cardRects = [];

function getCardRects() {
    cardRects.length = 0;
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        cardRects.push({
            top: rect.top + window.scrollY,
            bottom: rect.bottom + window.scrollY,
            left: rect.left,
            right: rect.right
        });
    });
}

function isInsideCard(x, y) {
    return cardRects.some(r =>
        x >= r.left && x <= r.right &&
        y >= r.top && y <= r.bottom
    );
}

function getValidZone() {
    let x, y, tries = 0;
    do {
        x = Math.random() * window.innerWidth;
        y = Math.random() * window.innerHeight;
        tries++;
    } while (isInsideCard(x, y) && tries < 30);

    return tries >= 30 ? null : { x, y };
}

function createLightningSegment(x, y, direction) {
    const lightning = document.createElement("div");
    lightning.classList.add("lightning");

    const length = 400 + Math.random() * 200;

    lightning.style.top = `${y}px`;
    lightning.style.left = `${x}px`;

    if (direction === "horizontal") {
        lightning.style.width = "0px";
        lightning.style.height = "2px";
    } else {
        lightning.style.width = "2px";
        lightning.style.height = "0px";
    }

    document.body.appendChild(lightning);

    // Animate grow → shrink → fade
    lightning.animate([
        direction === "horizontal"
            ? { width: "0px", opacity: 0 }
            : { height: "0px", opacity: 0 },

        direction === "horizontal"
            ? { width: `${length}px`, opacity: 1, offset: 0.166 } // 0.5s
            : { height: `${length}px`, opacity: 1, offset: 0.166 },

        direction === "horizontal"
            ? { width: `${length / 2}px`, opacity: 0, offset: 1 } // 0.7s–3s fading
            : { height: `${length / 2}px`, opacity: 0, offset: 1 }
    ], {
        duration: 3000, // 0.5 grow + 0.2 shrink + 2.5 fade
        easing: "ease-in-out",
        fill: "forwards"
    });

    setTimeout(() => lightning.remove(), 2500); // remove after animation
}




function lightningLoop() {
    getCardRects();
    const count = 2 + Math.floor(Math.random() * 3); // 2–4
    const usedZones = [];

    let delay = 0;

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            let zone, tries = 0;

            do {
                zone = getValidZone();
                tries++;
            } while (
                zone &&
                usedZones.some(p => Math.abs(p.x - zone.x) < 200 && Math.abs(p.y - zone.y) < 200) &&
                tries < 20
            );

            if (zone) {
                usedZones.push(zone);
                const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
                createLightningSegment(zone.x, zone.y, direction);
            }
        }, delay);

        delay += 300; // staggered appearance
    }

    setTimeout(lightningLoop, delay + 1000); // trigger next batch
}

window.addEventListener("DOMContentLoaded", () => {
    lightningLoop();
});
