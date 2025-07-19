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
        observer.unobserve(entry.target); // remove this line if you want it to re-trigger
      }
    });
  });

  const target = document.querySelector('.basp');
  if (target) {
    observer.observe(target);
  }
});

