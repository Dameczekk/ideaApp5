const title = document.querySelector('title');

const main = () => {
  if (runPanel == true) {
    setTimeout(() => {
      loadAccountPanel(
        usernames[accountIndex],
        profilePics[accountIndex] + '.png',
        notifications
      );
      setTimeout(() => {
        startPanel();
      }, 200);
    }, 1000);
  } else {
    setTimeout(() => {
      toggleModal(1);
      title.textContent = 'IDEA - login';
    }, 500);
  }
}

const startPanel = () => {
  const startScreen = document.querySelector('.startScreen');
  const main = document.querySelector('main');

  startScreen.querySelector('img').style.transform = 'scale(1.4)';

  main.classList.add('hidden');
  startScreen.style.opacity = '0';

  setTimeout(() => {
    startScreen.classList.add('hidden');
    main.classList.remove('hidden');
  }, 500);

  title.textContent = 'IDEA - panel';
}

const logOut = () => {
  window.location.reload();

  runPanel = false;
}

logOut_Button.addEventListener('click', () => {
  logOut();
  cookiesUpdate();
});

main();

// rules

// document.onselectstart = function() { return false; }
// document.ondragstart = function() { return false; }

// document.addEventListener('contextmenu', function(e) { e.preventDefault() }, false);
