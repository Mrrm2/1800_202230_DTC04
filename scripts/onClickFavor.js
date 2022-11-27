// If you wanna use local storage 🦄 - but doesn't work in this case anyway
// var actName = localStorage.getItem("Paint and Sip"); // key랑 value가 똑같아서 사실 필요없음ㅋ
var currActivity;

async function readActivity() {
  let params = new URL(window.location.href);
  // let activityID = params.searchParams.get("activityID")
  let name = params.searchParams.get("name");
  let activityTemplate = document.getElementById("activity_template");

  await db
    .collection("activities_example")
    .where("name", "==", name)
    .get()
    .then((somedoc) => {
      let newcard = activityTemplate.content.cloneNode(true);

      newcard.querySelector("#description").innerHTML =
        somedoc.docs[0].data().description; //using javascript to display the data on the right place
      newcard.querySelector("#activity-title").innerHTML =
        "<h2>" + somedoc.docs[0].data().name + "</h2>";
      newcard.querySelector("#activity-image").src =
        somedoc.docs[0].data().picture;
      newcard.querySelector("#timeGoesHere").innerHTML =
        somedoc.docs[0].data().time;
      newcard.querySelector("#inoutGoesHere").innerHTML =
        somedoc.docs[0].data().inout;
      newcard.querySelector("#energyGoesHere").innerHTML =
        somedoc.docs[0].data().energy;
      newcard.querySelector("#costGoesHere").innerHTML =
        somedoc.docs[0].data().cost;
      newcard.querySelector("#groupGoesHere").innerHTML =
        somedoc.docs[0].data().group;
      newcard.querySelector("#proximityGoesHere").innerHTML =
        somedoc.docs[0].data().proximity;
      currActivity = somedoc.docs[0].id;

      document.getElementById("activity_list").appendChild(newcard);

      //Here are other ways to access key:value data fields
      //$('#quote-goes-here').text(tuesdayDoc.data().quote);                                       //using jquery object dot notation
      //$("#quote-goes-here").text(tuesdayDoc.data()["quote"]);                                    //using json object indexing
    });
}

function goBack() {
  history.back();
}

function setFavouriteButton() {
  // for if activity is not favourite
  $("#favourite").html(`
      Favourite <i class='bi bi-star'></i>
    `);
}

function setUnfavouriteButton() {
  // for if activity is favourite

  $("#favourite").html(`
      Unfavourite <i class='bi bi-star-fill' style = 'color: rgb(255, 210, 48);'></i>
      `);
}

function removeFavourite(ID, activity_ID) {
  db.collection("users")
    .doc(ID)
    .set(
      {
        favourites: firebase.firestore.FieldValue.arrayRemove(activity_ID),
      },
      { merge: true }
    );
}

function addFavourite(ID, activity_ID) {
  db.collection("users")
    .doc(ID)
    .set(
      {
        favourites: firebase.firestore.FieldValue.arrayUnion(activity_ID),
      },
      { merge: true }
    );
}

favourite = function () {
  console.log("clicked");
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      user_ID = user.uid;
      // check if activity id is in user's favourites
      db.collection("users")
        .doc(user_ID)
        .get()
        .then((doc) => {
          if (doc.data().favourites != undefined) {
            if (doc.data().favourites.includes(currActivity)) {
              // remove currActivity from firestore
              removeFavourite(user_ID, currActivity);
              setFavouriteButton();
            } else {
              // add currActivity to database
              addFavourite(user_ID, currActivity);
              setUnfavouriteButton();
            }
          } else {
            // add currActivity to database
            addFavourite(user_ID, currActivity);
            setUnfavouriteButton();
          }
        });
    } else {
      if (confirm("Please sign in to add to your favourites!")) {
        window.location.href = "/signin.html";
      }
    }
  });
};

function reactiveFavouriteButton() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      user_ID = user.uid;
      // check if activity id is in user's favourites
      db.collection("users")
        .doc(user_ID)
        .get()
        .then((doc) => {
          if (
            doc.data().favourites != undefined &&
            doc.data().favourites.includes(currActivity)
          ) {
            setUnfavouriteButton();
          } else {
            setFavouriteButton();
          }
        });
    }
  });
}

$(document).ready(async function () {
  // check if user is logged in
  await readActivity();
  reactiveFavouriteButton();
});
