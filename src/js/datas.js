const loadAccountPanel = (username, profilePic, notifications) => {
  const allUsernames = document.querySelectorAll('.account_Username');
  const allProfilePics = document.querySelectorAll('.account_ProfilePics');

  allUsernames.forEach(element => element.textContent = username);
  allProfilePics.forEach(element => element.setAttribute('src', profilePic));

  if (Array.isArray(notifications)) {
    notifications.forEach((element, index) => {
      renderNotification(index);
    });
  } else if (typeof notifications === 'object' && notifications !== null) {
    renderNotification(0);
  } else {
    console.error('Błąd: notifications nie jest prawidłową tablicą ani obiektem.');
  }
}
