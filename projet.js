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


/** exemple particle
let bix = document.getElementById('bix');
bix.addEventListener('mousemove', function(e) {
  let rect = bix.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
  let numParticles = 20;
  for (let i = 0; i < numParticles; i++) {
    createParticle(x,y);
  }
});
function createParticle(x,y) {
  let particle = document.createElement('div');
  particle.classList.add('particle');
  particle.style.left = x + 'px';
  particle.style.top = y + 'px';
  let angle = Math.random() * 80 + 20;
  let tx = Math.cos(angle) * distance;
  let ty = Math.sin(angle) * distance;

  particle.style.setProperty('--tx', tx + 'px');
  particle.style.setProperty('--ty', ty + 'px');

  bix.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  },1000)
}
*/