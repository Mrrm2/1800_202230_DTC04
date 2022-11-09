// function contactUs() {
//   let fname = document.getElementById("inputFirstName").value;
//   let lname = document.getElementById("inputLastName").value;
//   let email = document.getElementById("inputEmail4").value;
//   let comment = document.getElementById("floatingTextarea2").value;
//   console.log("contact us");

//   db.collection("contactUs")
//     .add({
//       firstName: fname,
//       lastName: lname,
//       email: email,
//       comment: comment,
//     })
//     .then(function (docRef) {
//       console.log("Document written with ID: ", docRef.id);
//     })
//     .catch(function (error) {
//       console.error("Error adding document: ", error);
//     });
// }

function contactUs() {
  let fname = document.getElementById("inputFirstName").value;
  let lname = document.getElementById("inputLastName").value;
  let email = document.getElementById("inputEmail4").value;
  let comment = document.getElementById("floatingTextarea2").value;

  db.collection("contactUs")
    .add({
      firstName: fname,
      lastName: lname,
      email: email,
      comment: comment,
    })
    .then(() => {
      window.location.href = "/home/home.html";
    });
}
