firebase.auth().onAuthStateChanged(function (user) {
  const element = document.getElementById("nav1");
  if (user) {
    element.innerHTML = "My Account";
    element.href = "/account.html";
  } else {
    element.innerHTML = "Sign In";
    element.href = "/signin.html";
  }
});
