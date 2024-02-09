const signup_Button = document.querySelector('#signup_Button');
const login_Button = document.querySelector('#login_Button');


const allCancels = document.querySelectorAll('.cancel');

const confirm_0 = document.querySelector('#confirm_0');
const confirm_2 = document.querySelector('#confirm_2');
const confirm_3 = document.querySelector('#confirm_3');

const arrowBack = document.querySelector('#arrowBack');
const arrowForward = document.querySelector('#arrowForward');
const sliderContainer = document.querySelector('#profilePics');

const account_Button = document.querySelector('#account_Button');
const notifications_Button = document.querySelector('#notifications_Button');

let selectNotification = null;

const usernames_Cookie = getCookie('usernames');
const passwords_Cookie = getCookie('passwords');
const profilePics_Cookie = getCookie('profilePics');
const notifications_Cookie = getCookie('notifications');

const usernames = usernames_Cookie ? JSON.parse(usernames_Cookie) : [];
const passwords = passwords_Cookie ? JSON.parse(passwords_Cookie) : [];
const profilePics = profilePics_Cookie ? JSON.parse(profilePics_Cookie) : [];
const notifications = notifications_Cookie ? JSON.parse(notifications_Cookie) : [];


let runPanel_Cookie = getCookie('runPanel');
let accountIndex_Cookie = getCookie('accountIndex');

let accountIndex = accountIndex_Cookie ? JSON.parse(accountIndex_Cookie) : -1;
let runPanel = runPanel_Cookie ? JSON.parse(runPanel_Cookie) : null;
let currentImageIndex = 0;
let selectedImage = 0;

const resetModal = (number) => {
  const modal = document.querySelector(`.modal_${number}`);

  modal.querySelectorAll('input').forEach((element) => {
    element.value = '';
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

const checkLogin = () => {
  const username_Input = document.querySelector('#username_Input_0');
  const password_Input = document.querySelector('#password_Input_0');
  const alert = document.querySelector('#alert_0');

  accountIndex = usernames.indexOf(username_Input.value);

  if (username_Input.value == '' || password_Input.value == '') {
    alert.textContent = 'Fill in all inputs';
  } else {
    if (accountIndex != -1) {
      if (passwords[accountIndex] == password_Input.value) {
        cookiesUpdate();
        toggleModal(1);
        setTimeout(() => {
          toggleModal(3);
        }, 500);
      } else {
        alert.textContent = 'The password is incorrect';
      }
    } else {
      alert.textContent = 'Account not found';
    }
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

const SignUp = () => {
  const username_Input = document.querySelector('#username_Input_1');
  const password_Input = document.querySelector('#password_Input_1');
  const password_Input_2 = document.querySelector('#password_Input_2');

  const alert = document.querySelector('#alert_1');

  const upperCaseRegex = /[A-Z]/;
  const numberRegex = /\d/;

  if (username_Input.value == '' || password_Input.value == '' || password_Input_2.value == '') {
    alert.textContent = 'Fill in all inputs';
  } else if (usernames.includes(username_Input.value)) {
    alert.textContent = 'This username is already taken';
  } else if (password_Input.value.length > 16) {
    alert.textContent = 'Password is too long';
  } else if (password_Input.value.length < 8) {
    alert.textContent = 'Password is too short';
  } else if (!upperCaseRegex.test(password_Input.value)) {
    alert.textContent = 'Password must contain at least one uppercase letter';
  } else if (!numberRegex.test(password_Input.value)) {
    alert.textContent = 'Password must contain at least one number';
  } else if (password_Input_2.value != password_Input.value) {
    alert.textContent = 'Passwords are not the same';
  } else {
    alert.textContent = '';
    usernames.push(username_Input.value);
    passwords.push(password_Input.value);
    profilePics.push(`assets/img/pics/person${selectedImage}`);

    toggleModal(2);
    setTimeout(() => {
      window.location.reload();
    }, 500);
    
    cookiesUpdate();

    sendNotification(`Hello ${username_Input.value}!`, welcomeMessage);
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

const setCookie = (name, value, path = '/') => {
  document.cookie = name + "=" + value + ";expires=Fri, 31 Dec 9999 23:59:59 GMT;path=" + path;
}

const deleteCookie = (name) => {
  document.cookie = name + '=; Max-Age=-99999999;';  
};

const cookiesUpdate = () => {
  const path = '/';

  setCookie('usernames', JSON.stringify(usernames), path);
  setCookie('passwords', JSON.stringify(passwords), path);
  setCookie('profilePics', JSON.stringify(profilePics), path);
  setCookie('notifications', JSON.stringify(notifications), path);
  setCookie('accountIndex', accountIndex, path);
 
  setCookie('runPanel', runPanel, path);
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

const sendNotification = (title = 'hello world!', text = 'world is beautiful', sender = 'system', recipient = 'me', state = 'new', time) => {
  let date = new Date();

  time = `${date.getHours()}:${date.getMinutes()}`;

  let notification = {
    title: title,
    text: text,
    sender: sender,
    recipient: recipient,
    state: state,
    time: time
  }

  notifications.push(notification);

  cookiesUpdate();
}

const renderNotification = (path) => {
  const notificationsElement = document.querySelector('#notifications');
  const notificationPattern = document.querySelector('.notificationPattern');
  const element = notificationPattern.content.cloneNode(true);

  const notification_Title = element.querySelector('.notification_Title');
  const notification_Relation = element.querySelector('.notification_Relation');
  const notification_Text = element.querySelector('.notification_Text');

  notificationsElement.appendChild(element);

  notification_Title.textContent = notifications[path].title;
  notification_Relation.textContent = `${notifications[path].sender } » ${notifications[path].recipient} at ${notifications[path].time}`;
  notification_Text.textContent = notifications[path].text;
}

const reloadComponent = () => {
  
}

login_Button.addEventListener('click', () => checkLogin());
signup_Button.addEventListener('click', () => toggleModal(2));

arrowBack.addEventListener("click", () => handleArrowClick('backward'));
arrowForward.addEventListener("click", () => handleArrowClick('forward'));

confirm_2.addEventListener('click', () => SignUp());


confirm_3.addEventListener('click', () => {
  runPanel = true;
  logIn();
});

account_Button.addEventListener('click', () => toggleModal(4));
notifications_Button.addEventListener('click', () => toggleModal(5));

const cancel_0 = document.querySelector('#cancel_0');
const cancel_1 = document.querySelector('#cancel_1');
const cancel_2 = document.querySelector('#cancel_2');
const cancel_3 = document.querySelector('#cancel_3');
const cancel_4 = document.querySelector('#cancel_4');

cancel_0.addEventListener('click', () => toggleModal(0));
cancel_1.addEventListener('click', () => toggleModal(2));
cancel_2.addEventListener('click', () => {
  toggleModal(3);
  runPanel = false;
  logIn();
});
cancel_3.addEventListener('click', () => toggleModal(4));
cancel_4.addEventListener('click', () => toggleModal(5));