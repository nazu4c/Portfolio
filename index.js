document.addEventListener("DOMContentLoaded", function () {
  const text = "Je suis un développeur junior";
  const target = document.querySelector("#text strong");
  let index = 0;

  if (!target) {
    console.error("L'élément cible n'a pas été trouvé !");
    return;
  }

  function typeWriter() {
    if (index < text.length) {
      target.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, 100);
    }
  }

  typeWriter();
});


document.addEventListener("DOMContentLoaded", function () {
  const bioElement = document.querySelector('.bio');
  const exitBtn = document.querySelector('.exit-fullscreen');
  const bioParagraph = bioElement.querySelector('p');
  const clbImage = bioElement.querySelector('.clb');

  function openFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  bioElement.addEventListener('click', function () {
    openFullscreen(bioElement);
  });

  exitBtn.addEventListener('click', function (event) {
    event.stopPropagation(); 
    closeFullscreen();
  });

  document.addEventListener('fullscreenchange', function () {
    if (document.fullscreenElement === bioElement) {
      exitBtn.style.display = 'block';
      bioParagraph.style.display = 'block';
      if (clbImage) clbImage.style.display = 'none'; // Hide image
    } else {
      exitBtn.style.display = 'none';
      bioParagraph.style.display = 'none';
      if (clbImage) clbImage.style.display = 'block'; // Show image
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('zoom-active');
        observer.unobserve(entry.target); 
      }
    });
  });

  const target = document.querySelector('.basp');
  if (target) {
    observer.observe(target);
  }
});


let konamiInput = [];
const konamiCode = [
  "arrowup", "arrowup",
  "arrowdown", "arrowdown",
  "arrowleft", "arrowright",
  "arrowleft", "arrowright",
  "b", "a"
];

let glitchLevel = 0;
let glitchActive = false;

window.addEventListener("keydown", (e) => {
  konamiInput.push(e.key.toLowerCase());

  if (konamiInput.length > konamiCode.length) {
    konamiInput.shift();
  }

  if (konamiInput.join("") === konamiCode.join("")) {
    glitchLevel++;
    triggerGlitch(glitchLevel);
    konamiInput = [];
  }
});

function triggerGlitch(level) {
  const body = document.body;

  if (level < 3) {
    glitchActive = true;
    body.classList.add("glitch");
  } else {
    glitchActive = false;
    body.classList.remove("glitch");
    glitchLevel = 0;
  }
}

setInterval(() => {
  if (glitchActive) {
    document.body.classList.add("glitch");
  }
}, 1000);

function triggerGlitch(level) {
  const body = document.body;
  body.classList.remove("glitch", "glitch-intense");

  if (level === 1) {
    body.classList.add("glitch");
  } else if (level === 2) {
    body.classList.add("glitch-intense");
  } else if (level >= 3) {
    body.classList.add("glitch-intense");
    body.style.transform = "rotate(180deg)";
  }

  setTimeout(() => {
    body.classList.remove("glitch", "glitch-intense");
    body.style.transform = "none";
  }, 5000);

  setTimeout(() => {
    glitchLevel = 0;
  }, 30000);
}


const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});


window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  const loadingContent = document.querySelector('.loading-content');
  const mainContent = document.getElementById('main-content');

  const minDuration = 750; // ms
  const startTime = Date.now();

  const allImages = Array.from(document.images);
  const imagePromises = allImages.map(img => {
    if (img.complete) return Promise.resolve();
    return new Promise(resolve => {
      img.onload = img.onerror = resolve;
    });
  });

  Promise.all(imagePromises).then(() => {
    const timeElapsed = Date.now() - startTime;
    const remainingTime = Math.max(minDuration - timeElapsed, 0);

    setTimeout(() => {

      loadingContent.style.transform = 'scale(0.8)';
      loadingContent.style.opacity = '0';

      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.pointerEvents = 'none';

        setTimeout(() => {
          loadingScreen.style.display = 'none';
          mainContent.style.display = 'block';
        }, 600);
      }, 500);
    }, remainingTime);
  });
});

const CODE_SECRET = "2009";

function verifierCode() {
  const saisie = document.getElementById("codeSecret").value.trim();
  if (saisie === CODE_SECRET) {
    document.getElementById("infosCachees").style.display = "block";
  } else {
    alert("Code incorrect. Essaie encore !");
  }
}

let box = document.querySelectorAll(".qualite");
box.forEach(box => {
    box.onmousemove = function(e) {
        let x = e.pageX - box.offsetLeft;
        let y = e.pageY - box.offsetTop;

        box.style.setProperty('--x', x+'px');
        box.style.setProperty('--y', y+'px');
    }
})