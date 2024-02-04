const loadAccountPanel = (username, profilePic) => {
  const allUsernames = document.querySelectorAll('.account_Username');
  const allProfilePics = document.querySelectorAll('.account_ProfilePics');

  allUsernames.forEach(element => element.textContent = username);
  allProfilePics.forEach(element => element.setAttribute('src', profilePic));
}