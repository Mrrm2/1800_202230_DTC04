const listOfInput = document.querySelectorAll(".dropdown-item");

for (let input of listOfInput) {
  input.addEventListener("click", function () {
    input.parentElement.parentElement.children[0].innerHTML = input.innerHTML;
  });
}

function displayName() {
  // get user information from firebase
  firebase.auth().onAuthStateChanged((user) => {
    // Check if a user is signed in:
    if (user) {
      user_Name = user.displayName;
      $("#welcomeBanner").text("Welcome, " + user_Name + "!"); //using jquery
    } else {
      $("#welcomeBanner").text("Welcome, Guest!");
    }
  });
}

displayName();
