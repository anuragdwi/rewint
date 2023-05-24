// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCvdj6otmIskA1JfpkoRuL8AeS0gLbbQ1s",
  authDomain: "rewint-64325.firebaseapp.com",
  databaseURL: "https://rewint-64325-default-rtdb.firebaseio.com",
  projectId: "rewint-64325",
  storageBucket: "rewint-64325.appspot.com",
  messagingSenderId: "304594891895",
  appId: "1:304594891895:web:b9469f93433ebb69ed8272",
  measurementId: "G-GED8CGB6XD",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Reference messages collection
var messagesRef = firebase.database().ref("messages");
var subRef = firebase.database().ref("subscription");

// Listen for form submit
document.getElementById("contactForm").addEventListener("submit", submitForm);
document.getElementById("form").addEventListener("submit", subScribe);

// ======================Subscribe form=====================
function subScribe(e) {
  e.preventDefault();

  var subs = getInVal("subs");

  // Save MEssages
  saveSubs(subs);
  // Reset subscription form
  document.getElementById("form").reset();

  alert("Thankyou for the subscription");
  // console.log(subs);
}
function getInVal(id) {
  return document.getElementById(id).value;
}

function saveSubs(subs) {
  var newSubsRef = subRef.push();
  newSubsRef.set({
    subscription: subs,
  });
}

function submitForm(e) {
  e.preventDefault();

  // Get values
  var name = getInputVal("name");

  var email = getInputVal("email");

  var message = getInputVal("message");
  // console.log(name, email, message);

  // Save message
  saveMessage(name, email, message);

  // Show alert
  document.querySelector(".alert").style.display = "block";

  // Hide alert after 3 seconds
  setTimeout(function () {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  // Clear form
  document.getElementById("contactForm").reset();
}

// Function to get get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, message) {
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,

    email: email,

    message: message,
  });
}

// ====================Upload CV=======================
function uploadImage() {
  const ref = firebase.storage().ref();
  const file = document.querySelector("#photo").files[0];
  const name = +new Date() + "-" + file.name;
  const metadata = {
    contentType: file.type,
  };
  const task = ref.child(name).put(file, metadata);
  task
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((url) => {
      console.log(url);
      document.querySelector("#image").src = url;
    })
    .catch(console.error);
}

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const snap = document.getElementById("snap");
const errorMsgElement = document.querySelector("span#errorMsg");

const constraints = {
  audio: false,
  video: {
    width: 400,
    height: 400,
  },
};

//===============Mobile NAvbar===========================//
const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

const sections = document.querySelectorAll("section[id]");

function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 200) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

//=========================== POPUP =====================
const loginPopup = document.querySelector(".login-popup");
const close = document.querySelector(".close");

window.addEventListener("load", function () {
  showPopup();
  setTimeout(function () {
    loginPopup.classList.add("show");
  }, 5000);
});

function showPopup() {
  const timeLimit = 5;

  // seconds;
  let i = 0;
  const timer = setInterval(function () {
    i++;
    if (i == timeLimit) {
      clearInterval(timer);
      loginPopup.classList.add("show");
    }
    // console.log(i);
  }, 1000);
}

close.addEventListener("click", function () {
  loginPopup.classList.remove("show");
});
// ================== Swiper=======================
let swiper = new Swiper(".mySwiper", {
  cssMode: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  mousewheel: true,
  keyboard: true,
});
