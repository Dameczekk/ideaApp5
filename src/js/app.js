const dashboard_Button = document.querySelector('#button_0');
const settings_Button = document.querySelector('#button_1');

const signup_Button = document.querySelector('#signup_Button');
const login_Button = document.querySelector('#login_Button');

const toggleArrow = document.querySelector('#toggleArrow');

const allCancels = document.querySelectorAll('.cancel');

const confirm_0 = document.querySelector('#confirm_0');
const confirm_2 = document.querySelector('#confirm_2');
const confirm_3 = document.querySelector('#confirm_3');

const arrowBack = document.querySelector('#arrowBack');
const arrowForward = document.querySelector('#arrowForward');
const sliderContainer = document.querySelector('#profilePics');

const usernames_Cookie = getCookie('usernames');
const passwords_Cookie = getCookie('passwords');
const profilePics_Cookie = getCookie('profilePics');

const usernames = usernames_Cookie ? JSON.parse(usernames_Cookie) : [];
const passwords = passwords_Cookie ? JSON.parse(passwords_Cookie) : [];
const profilePics = profilePics_Cookie ? JSON.parse(profilePics_Cookie) : [];

const logOut_Button = document.querySelector('#button_2_1');

let accountIndex = getCookie('accountIndex') || null;
let runPanel = JSON.parse(getCookie('runPanel')) || null;
let currentImageIndex = 0;
let selectedImage = 0;

const resetModal = (number) => {
  const modal = document.querySelector(`.modal_${number}`);

  modal.querySelectorAll('input').forEach((element) => {
    element.value = '';
    element.classList.remove('highlight');
  });
  modal.querySelectorAll('.alert').forEach(element => {
    element.textContent = '';
  });

  number == 2 ? resetSlider() : '';
}

const toggleModal = (number) => {
  const modal = document.querySelector(`.modal_${number}`);

  if (modal) {
    if (modal.classList.contains('hidden')) {
      modal.classList.remove('hidden');
      modal.classList.add('modal_Animation');
    } else {
      modal.classList.remove('modal_Animation');
      setTimeout(() => {
        modal.classList.add('hidden');
        resetModal(number);
      }, 500);
    }
    toggleOverlay();
  }
}

const switchSection = (number) => {
  const entranceSection = document.querySelector('.activeSection');
  const outputSection = document.querySelector(`.section_${number}`);

  if (outputSection) {
    entranceSection.classList.remove('activeSection');
    outputSection.classList.add('activeSection');
  }
}

const toggleOverlay = () => {
  const overlay = document.querySelector('.overlay');

  if (overlay.classList.contains('hidden')) {
    overlay.classList.remove('hidden');
    setTimeout(() => {
      overlay.classList.add('animation_overlay');
    }, 50);
  } else {
    overlay.classList.remove('animation_overlay');
    setTimeout(() => {
      overlay.classList.add('hidden');
    }, 500);
  }
}

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

const checkLogin = () => {
  const username_Input = document.querySelector('#username_Input_0');
  const password_Input = document.querySelector('#password_Input_0');


  if (passwords[accountIndex] == password_Input.value) {
    accountIndex = usernames.indexOf(username_Input.value);
    
    toggleModal(1);
    setTimeout(() => {
      toggleModal(3);
    }, 500);
    } else {
    // ...
  }
}

const resetSlider = () => {
  const profilePics = document.querySelector('#profilePics');

  selectedImage = 0;
  currentImageIndex = 0;
  profilePics.style.transform = 'translateX(0px)';
}

const updateSlider = () => {
  const translateXValue = -currentImageIndex * 142;
  sliderContainer.style.transform = `translateX(${translateXValue}px)`;
}

const handleArrowClick = (direction) => {
  if (direction === 'backward') {
    currentImageIndex = (currentImageIndex - 1 + sliderContainer.childElementCount) % sliderContainer.childElementCount;
    selectedImage !== 0 ? selectedImage-- : selectedImage = 14;
  } else if (direction === 'forward') {
    currentImageIndex = (currentImageIndex + 1) % sliderContainer.childElementCount;
    selectedImage !== 14 ? selectedImage++ : selectedImage = 0;
  }

  updateSlider();
};

const highlight = (element) => {
  const input = element;
  input.classList.add('highlight');
}

const clearHighlight = (elements) => {
  const elementsArray = Array.from(elements);

  elementsArray.forEach((element) => {
    const input = element;
    input.classList.remove('highlight');
  });
}

const SignUp = () => {
  const username_Input = document.querySelector('#username_Input_1');
  const password_Input = document.querySelector('#password_Input_1');
  const password_Input_2 = document.querySelector('#password_Input_2');

  const alert = document.querySelector('#alert_1');

  const upperCaseRegex = /[A-Z]/;
  const numberRegex = /\d/;

  const elementsToHighlight = [username_Input, password_Input, password_Input_2];

  clearHighlight(elementsToHighlight);

  if (username_Input.value == '' || password_Input.value == '' || password_Input_2.value == '') {
    alert.textContent = 'Fill in all inputs';
    highlight(username_Input);
    highlight(password_Input);
    highlight(password_Input_2);
  } else if (usernames.includes(username_Input.value)) {
    alert.textContent = 'This username is already taken';
    highlight(username_Input);
  } else if (password_Input.value.length > 16) {
    alert.textContent = 'Password is too long';
    highlight(password_Input);
  } else if (password_Input.value.length < 8) {
    alert.textContent = 'Password is too short';
    highlight(password_Input);
  } else if (!upperCaseRegex.test(password_Input.value)) {
    alert.textContent = 'Password must contain at least one uppercase letter';
    highlight(password_Input);
  } else if (!numberRegex.test(password_Input.value)) {
    alert.textContent = 'Password must contain at least one number';
    highlight(password_Input);
  } else if (password_Input_2.value != password_Input.value) {
    alert.textContent = 'Passwords are not the same';
    highlight(password_Input);
    highlight(password_Input_2);
  } else {
    alert.textContent = '';
    usernames.push(username_Input.value);
    passwords.push(password_Input.value);
    profilePics.push(`assets/img/pics/person${selectedImage}`);

    cookiesUpdate();
  }
}

function getCookie(name) {
  const cookieName = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');

  for(let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) == 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
}

const setCookie = (name, value) => {
  document.cookie = name + "=" + value + ";expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/";
}

const deleteCookie = (name) => {
  document.cookie = name + '=; Max-Age=-99999999;';  
};

const cookiesUpdate = () => {
  setCookie('usernames', JSON.stringify(usernames));
  setCookie('passwords', JSON.stringify(passwords));
  setCookie('profilePics', JSON.stringify(profilePics));
  setCookie('accountIndex', accountIndex);
 
  setCookie('runPanel', runPanel);
}

const logIn = () => {
  toggleModal(3);
  loadAccountPanel(
    usernames[accountIndex],
    profilePics[accountIndex] + '.png'
  );
  startPanel();
  cookiesUpdate();
}

dashboard_Button.addEventListener('click', () => switchSection(0));
settings_Button.addEventListener('click', () => toggleModal(0));

allCancels.forEach((element, i) => {
  element.addEventListener('click', () => {
    if (i == 1) {
      toggleModal(2);
    } else if (i == 2) {
      runPanel = false;
      logIn();
    } else {
      toggleModal(i);
    }
  });
});

login_Button.addEventListener('click', () => checkLogin());
signup_Button.addEventListener('click', () => toggleModal(2));

arrowBack.addEventListener("click", () => handleArrowClick('backward'));
arrowForward.addEventListener("click", () => handleArrowClick('forward'));

confirm_2.addEventListener('click', () => SignUp());

toggleArrow.addEventListener('click', () => toggleMainSideBar());

confirm_3.addEventListener('click', () => {
  runPanel = true;
  logIn();
});