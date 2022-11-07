// logout firestore
signOut = function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      window.location.href = "/index.html";
    })
    .catch((error) => {
      // An error happened.
    });
};

firebase.auth().onAuthStateChanged(function (user) {
  const element = document.getElementById("sign-in-or-out");
  if (user) {
    element.innerHTML = "Sign Out";
    element.onclick = signOut;
  } else {
    element.innerHTML = "Sign In";
    element.onclick = function () {
      window.location.href = "/signin.html";
    };
  }
});
