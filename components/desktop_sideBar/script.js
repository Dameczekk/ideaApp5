const sideBars = document.querySelector('.sideBars')

const mainSideBar = document.createElement('div');
const block0 = document.createElement('div');
const block1 = document.createElement('div');
const block2 = document.createElement('div');

const button0 = createButton('button_0', 'Dashboard', 'assets/img/icons/dashboard.png');
const button1 = createButton('button_1', 'Settings', 'assets/img/icons/settings.png');
const toggleArrowButton = createButton('toggleArrow', '', 'assets/img/icons/left.png');
const button2_1 = createButton('button_2_1', 'Logout', 'assets/img/icons/logout.png');

mainSideBar.classList.add('mainSideBar');
block0.classList.add('block_0');
block0.appendChild(button0);
block0.appendChild(button1);
mainSideBar.appendChild(block0);
block1.classList.add('block_1');
mainSideBar.appendChild(block1);
block2.classList.add('block_2');
block2.appendChild(toggleArrowButton);
block2.appendChild(button2_1);
mainSideBar.appendChild(block2);
sideBars.appendChild(mainSideBar);

const toggleMainSideBar = () => {
  const arrow = toggleArrow.querySelector('img');
  const mainSideBar = document.querySelector('.mainSideBar');
  const allSections = document.querySelectorAll('section');

  const leftArrowImg = 'assets/img/icons/left.png';
  const rightArrowImg = 'assets/img/icons/right.png';

  const buttons = mainSideBar.querySelectorAll('button');

  buttons.forEach(element => {
    element.classList.toggle('smallButton');
  });

  arrow.setAttribute('src', (arrow.getAttribute('src') == leftArrowImg) ? rightArrowImg : leftArrowImg);

  mainSideBar.classList.toggle('expanded_sideBar');
  allSections.forEach((element) => {
    element.classList.toggle('expanded_panel');
  });
}

function createButton(id, text, iconSrc) {
  const button = document.createElement('button');
  button.id = id;

  const img = document.createElement('img');
  img.src = iconSrc;
  img.alt = `${text} icon`;

  const h2 = document.createElement('h2');
  h2.textContent = text;

  button.appendChild(img);
  button.appendChild(h2);

  return button;
}

const dashboard_Button = document.querySelector('#button_0');
const settings_Button = document.querySelector('#button_1');
const logOut_Button = document.querySelector('#button_2_1');
const toggleArrow = document.querySelector('#toggleArrow');

dashboard_Button.addEventListener('click', () => switchSection(0));
settings_Button.addEventListener('click', () => toggleModal(0));
toggleArrow.addEventListener('click', () => toggleMainSideBar());
