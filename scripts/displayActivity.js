////////////////////////
// 1. Get activity filters from local storage
// 2. Use filters to select a list of activities from firestore
// 3. Randomly select an activity from the list, display it, and remove from list1
// 4. Display activities
////////////////////////

var activities = db.collection("activities_example"); // change to the name of the collection

// 1. Get activity filters from local storage
// stored in the format
// filters = {
//     "cost": "None",
//     "time": "6-10H",
//     "proximity": "Short",
//     "group": "None",
//     "energy": "Medium",
//     "inout": "None"
// }
var filters = JSON.parse(localStorage.getItem("filtersForGenerate"));
console.log(filters);
var listOfActivities = [];

async function grabActivities(filters) {
  // 2. Use filters to select a list of activities from firestore
  await activities.get().then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      var activity = doc.data();
      // for each activity, check if it matches the filters
      if (
        (filters.cost == "None" || filters.cost == activity.cost) &&
        (filters.time == "None" || filters.time == activity.time) &&
        (filters.proximity == "None" ||
          filters.proximity == activity.proximity) &&
        (filters.group == "None" || filters.group == activity.group) &&
        (filters.energy == "None" || filters.energy == activity.energy) &&
        (filters.inout == "None" || filters.inout == activity.inout)
      ) {
        // if it matches, add it to the list of activities
        listOfActivities.push(doc.id);
      }
    });
  });
}

// 3. Randomly select an activity from the list, display it, and remove from list1
function selectRandomActivityFromList(listOfActivities) {
  // if there are no activities left, display a message
  if (listOfActivities.length == 0) {
    alert("No activities match your filters. Please try again.");
    return;
  }
  // randomly select an activity from the list
  var randomIndex = Math.floor(Math.random() * listOfActivities.length);
  var randomActivity = listOfActivities[randomIndex];
  console.log(randomActivity);
  return randomActivity;
}

// 4. Display activities
function readActivity(activityID) {
  activities
    .doc(activityID) //name of the collection and documents should matach excatly with what you have in Firestore
    .onSnapshot((somedoc) => {
      //arrow notation
      console.log(somedoc.data().description); //.data() returns data object
      document.getElementById("description").innerHTML =
        somedoc.data().description; //using javascript to display the data on the right place
      document.getElementById("nameGoesHere").innerHTML = somedoc.data().name;
      document.getElementById("activity-image").src = somedoc.data().picture;
      //  document.getElementById("activity-image").style.height = "50vh";  //데스크탑 화면으로 사진 크기 조정하고 싶다면

      document.getElementById("timeGoesHere").innerHTML = somedoc.data().time;
      document.getElementById("inoutGoesHere").innerHTML = somedoc.data().inout;
      document.getElementById("energyGoesHere").innerHTML =
        somedoc.data().energy;
      document.getElementById("costGoesHere").innerHTML = somedoc.data().cost;
      document.getElementById("groupGoesHere").innerHTML = somedoc.data().group;
      document.getElementById("proximityGoesHere").innerHTML =
        somedoc.data().proximity;

      //Here are other ways to access key:value data fields
      //$('#quote-goes-here').text(tuesdayDoc.data().quote);                                       //using jquery object dot notation
      //$("#quote-goes-here").text(tuesdayDoc.data()["quote"]);                                    //using json object indexing
    });
}

function setUnfavouriteButton() {
  // for if activity is favourite
  $("#favourite").html(
    `{
      Favourite <i class='bi bi-star'></i>
    }`
  );
}

function setFavouriteButton() {
  // for if activity is not favourite
  $("#favourite").html(`{
      Unfavourite <i class='bi bi-star'></i>
    }`);
}

function reactiveFavouriteButton() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      user_ID = user.uid;
      // check if activity id is in user's favourites
      db.collection("users")
        .doc(user_ID)
        .get()
        .then((doc) => {
          if (doc.data().favourites.includes(currActivity)) {
            console.log("activity in favorites");
            //   // remove currActivity from firestore
            //   db.collection("users")
            //     .doc(user_ID)
            //     .update({
            //       favourites:
            //         firebase.firestore.FieldValue.arrayRemove(currActivity),
            //     });
            //   console.log("removed from favourites");
            setUnfavouriteButton();
          } else {
            console.log("activity not in favorites");
            //   // add currActivity to database
            //   db.collection("users")
            //     .doc(user_ID)
            //     .update({
            //       favourites:
            //         firebase.firestore.FieldValue.arrayUnion(currActivity),
            //     });
            //   console.log("added to favourites");
            setFavouriteButton();
          }
        });
    } else {
      if (confirm("Please sign in to add to your favorites!")) {
        window.location.href = "/signin.html";
      }
    }
  });
}

$(document).ready(async function () {
  await grabActivities(filters);
  currActivity = selectRandomActivityFromList(listOfActivities);
  readActivity(currActivity);
  reactiveFavouriteButton();
});
