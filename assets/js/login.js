import { initSockets } from './sockets';

const loginForm = document.getElementById('jsLogin');

const NICKNAME = 'nickname';
const LOGGED_OUT = 'loggedOut';
const LOGGED_IN = 'loggedIn';

const nickname = localStorage.getItem(NICKNAME);

const logIn = nickname => {
  const socket = io('/');
  socket.emit(window.events.setNickname, { nickname });
  initSockets(socket);
};

if (nickname === null) {
  document.body.className = LOGGED_OUT;
} else {
  document.body.className = LOGGED_IN;
  logIn(nickname);
}

const handleFormSubmit = e => {
  e.preventDefault();
  const input = loginForm.querySelector('input');
  const { value } = input;
  input.value = '';
  localStorage.setItem(NICKNAME, value);
  document.body.className = LOGGED_IN;
  logIn(value);
};

if (loginForm) {
  loginForm.addEventListener('submit', handleFormSubmit);
}
