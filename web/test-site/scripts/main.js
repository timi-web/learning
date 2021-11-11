let myImage = document.querySelector('img');

myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/helpmates.png') {
      myImage.setAttribute('src','images/connection.jpeg');
    } else {
      myImage.setAttribute('src','images/helpmates.png');
    }
}
let myButton = document.querySelector('button');
let myHeading = document.querySelector('h1');
function setUserName() {
    let myName = prompt('Please enter your name.');
    localStorage.setItem('name', myName);
    myHeading.textContent = 'HelpMates is cool, ' + myName;
  }
  if(!localStorage.getItem('name')) {
    setUserName();
  } else {
    let storedName = localStorage.getItem('name');
    myHeading.textContent = 'HelpMates is cool, ' + storedName;
  }
  myButton.onclick = function() {
    setUserName();
  }