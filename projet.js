document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll('.card-3d');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;


      const rotateX = ((y - centerY) / centerY) * 10; 
      const rotateY = ((x - centerX) / centerX) * 10; 

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });


    card.addEventListener('mouseleave', () => {
      card.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card-3d");

  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {

      const interval = setInterval(() => {
        releaseSmokeFromCard(card);
      }, 150);


      card.addEventListener("mouseleave", () => {
        clearInterval(interval);
      }, { once: true });
    });
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card-3d");

  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      const interval = setInterval(() => {
        releaseSmokeFromCard(card);
      }, 200);

      card.addEventListener("mouseleave", () => {
        clearInterval(interval);
      }, { once: true });
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  setInterval(() => {
    createSmokeRandom();
  }, 400);
});

function createSmokeRandom() {
  const container = document.getElementById("particles-container");
  const particle = document.createElement("div");
  particle.classList.add("particle");


  const x = Math.random() * window.innerWidth;
  const y = window.innerHeight * 0.7 + Math.random() * (window.innerHeight * 0.3);

  particle.style.left = x + "px";
  particle.style.top = y + "px";


  const distance = Math.random() * 200 + 150;
  const tx = (Math.random() - 0.5) * 100;
  const ty = -distance;

  particle.style.setProperty("--tx", tx + "px");
  particle.style.setProperty("--ty", ty + "px");

  container.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 8000);
}
