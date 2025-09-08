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