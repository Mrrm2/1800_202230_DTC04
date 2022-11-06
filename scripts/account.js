function insertName() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if a user is signed in:
    if (user) {
      console.log(user.displayName);
      user_Name = user.displayName;

      $("#insertName").text(user_Name + "!"); //using jquery
    } else {
    }
  });
}

// user signout from firebase
function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      window.location.href = "index.html";
    })
    .catch((error) => {
      // An error happened.
    });
}

function profilePicHandler() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if a user is signed in:
    if (user) {
      console.log(user.photoURL);
      user_Pic = user.photoURL;

      $("#profilePic").attr("src", user_Pic); //using jquery
    } else {
    }
  });
}

function nameHandler() {}

setup = function setup() {
  insertName();
  $("#sign-out").click(signOut);
  $("#profile-pic").click(profilePicHandler);
  $("#name").click(nameHandler);
};

$(document).ready(setup);
