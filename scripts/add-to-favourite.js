// $("#favourite").click(function () {
//   firebase.auth().onAuthStateChanged((user) => {
//     // Check if a user is signed in:
//     if (user) {
//       user_ID = user.uid;
//       // check if activity id is in user's favourites
//       db.collection("users")
//         .doc(user_ID)
//         .get()
//         .then((doc) => {
//           if (doc.data().favourites.includes(currActivity)) {
//             console.log("activity in favorites");
//             // remove currActivity from firestore
//             db.collection("users")
//               .doc(user_ID)
//               .update({
//                 favourites:
//                   firebase.firestore.FieldValue.arrayRemove(currActivity),
//               });
//             console.log("removed from favourites");
//           } else {
//             console.log("activity not in favorites");
//             // add currActivity to database
//             db.collection("users")
//               .doc(user_ID)
//               .update({
//                 favourites:
//                   firebase.firestore.FieldValue.arrayUnion(currActivity),
//               });
//             console.log("added to favourites");
//           }
//         });
//     } else {
//       if (confirm("Please sign in to add to your favorites!")) {
//         window.location.href = "/signin.html";
//       }
//     }
//   });
// });

// function isFavourite(userID, currActivity) {
//   // check if activity id is in user's favourites
//   db.collection("users")
//     .doc(userID)
//     .get()
//     .then((doc) => {
//       if (doc.data().favourites.includes(currActivity)) {
//         console.log("activity in favorites");
//         return true;
//       } else {
//         console.log("activity not in favorites");
//         return false;
//       }
//     });
// }
// var user_ID = "";

// function isSignedIn() {
//   firebase.auth().onAuthStateChanged((user) => {
//     // Check if a user is signed in:
//     if (user) {
//       return true;
//     } else {
//       return false;
//     }
//   });
// }

// $(document).ready(async function () {
//   if (await isSignedIn()) {
//     console.log("he");
//   } else {
//     console.log("no");
//   }
// });

// firebase.auth().onAuthStateChanged(function (user) {
//   if (user) {
//     user_ID = user.uid;
//     // check if activity id is in user's favourites
//     db.collection("users")
//       .doc(user_ID)
//       .get()
//       .then((doc) => {
//         if (doc.data().favourites.includes(currActivity)) {
//           console.log("activity in favorites");
//           //   // remove currActivity from firestore
//           //   db.collection("users")
//           //     .doc(user_ID)
//           //     .update({
//           //       favourites:
//           //         firebase.firestore.FieldValue.arrayRemove(currActivity),
//           //     });
//           //   console.log("removed from favourites");
//         } else {
//           console.log("activity not in favorites");
//           //   // add currActivity to database
//           //   db.collection("users")
//           //     .doc(user_ID)
//           //     .update({
//           //       favourites:
//           //         firebase.firestore.FieldValue.arrayUnion(currActivity),
//           //     });
//           //   console.log("added to favourites");
//         }
//       });
//   } else {
//     if (confirm("Please sign in to add to your favorites!")) {
//       window.location.href = "/signin.html";
//     }
//   }
// });
