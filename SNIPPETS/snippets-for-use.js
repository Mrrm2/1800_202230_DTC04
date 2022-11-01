var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      var user = authResult.user; // get the user object from the Firebase authentication database
      if (authResult.additionalUserInfo.isNewUser) {
        //if new user
        // ADD USER INFORMATION TO FIRESTORE AND REDIRECT TO HOME PAGE
        // CHANGE TO YOUR OWN COLLECTION NAME
        // CHANGE TO REDIRECT TO YOUR HOME PAGE
        // CAN REPURPOSE SNIPPET FOR ADDING USER RECOMMENDATIONS TO FIRESTORE
        db.collection("users")
          .doc(user.uid)
          .set({
            //write to firestore. We are using the UID for the ID in users collection
            name: user.displayName, //"users" collection
            email: user.email, //with authenticated user's ID (user.uid)
            country: "Canada", //optional default profile info
            school: "BCIT", //optional default profile info
          })
          .then(function () {
            console.log("New user added to firestore");
            window.location.assign("main.html"); //re-direct to main.html after signup
          })
          .catch(function (error) {
            console.log("Error adding new user: " + error);
          });
      } else {
        return true;
      }
      return false;
    },
    uiShown: function () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById("loader").style.display = "none";
    },
  },
  signInFlow: "popup",
  signInSuccessUrl: "main.html",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: "<your-tos-url>",
  // Privacy policy url.
  privacyPolicyUrl: "<your-privacy-policy-url>",
};

// REPURPOSE FOR ADDING USER RECOMMENDATIONS TO FIRESTORE
function writeHikes() {
  //define a variable for the collection you want to create in Firestore to populate data
  var hikesRef = db.collection("hikes");

  hikesRef.add({
    code: "BBY01",
    name: "Burnaby Lake Park Trail", //replace with your own city?
    city: "Burnaby",
    province: "BC",
    level: "easy",
    length: "10",
    details: "Elmo goes here regularly",
    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  hikesRef.add({
    code: "AM01",
    name: "Buntzen Lake Trail Trail", //replace with your own city?
    city: "Anmore",
    province: "BC",
    level: "moderate",
    length: "10.5",
    details: "Elmo goes here regularly",
    last_updated: firebase.firestore.FieldValue.serverTimestamp(),
  });
  hikesRef.add({
    code: "NV01",
    name: "Mount Seymoure Trail", //replace with your own city?
    city: "North Vancouver",
    province: "BC",
    level: "hard",
    length: "8.2",
    details: "Elmo goes here regularly",
    last_updated: firebase.firestore.Timestamp.fromDate(
      new Date("March 10, 2022")
    ),
  });
}

/// OR SOMETHING LIKE THIS
//-----------------------------------------------
// Create a "max" number of hike document objects
//-----------------------------------------------
function writeHikeData() {
  max = 21;
  //define a variable for the collection you want to create in Firestore to populate data
  var hikesRef = db.collection("hikes");
  for (i = 1; i <= max; i++) {
    hikesRef.add({
      //add to database, autogen ID
      name: "hike" + i,
      details:
        "Elmo says this hike is amazing!  You will love going on hike" + i,
      // last_updated: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
}

// GETTING DATA FROM FIRESTORE AND PUTTING IT INTO TEMPLATE
function displayCards(collection) {
  let cardTemplate = document.getElementById("hikeCardTemplate");
  // read collection that you want to display
  db.collection(collection)
    .get()
    .then((snap) => {
      //var i = 1;  //if you want to use commented out section
      snap.forEach((doc) => {
        //iterate thru each doc
        var title = doc.data().name; // get value of the "name" key
        var details = doc.data().details; // get value of the "details" key
        var hikeID = doc.data().code; //get unique ID to each hike to be used for fetching right image
        let newcard = cardTemplate.content.cloneNode(true);

        //update title and text and image
        newcard.querySelector(".card-title").innerHTML = title;
        newcard.querySelector(".card-text").innerHTML = details;
        newcard.querySelector(".card-image").src = `./images/${hikeID}.jpg`; //Example: NV01.jpg

        //give unique ids to all elements for future use
        // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
        // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
        // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

        //attach to gallery
        document.getElementById(collection + "-go-here").appendChild(newcard);
        //i++;   //if you want to use commented out section
      });
    });
}

displayCards("hikes");
