function handleResize() {
  const startScreen = document.querySelector('.startScreen');

  let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

  if (screenWidth <= 800) {
    startScreen.querySelector('img').setAttribute('src', 'assets/img/pics/ideaSmallLogo.png');
    startScreen.querySelector('img').classList.toggle('smallBrain');
  } else {
    startScreen.querySelector('img').setAttribute('src', 'assets/img/pics/ideaApp5Logo.png');
  }
}

window.addEventListener('resize', handleResize);

handleResize();
