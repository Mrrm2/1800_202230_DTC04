// Grab filters from local storage
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

function readActivity() {
  db.collection("activities_example")
    .doc("B8Cg3zNu1H8G7H3BRPxK") //name of the collection and documents should matach excatly with what you have in Firestore
    .onSnapshot((somedoc) => {  //arrow notation
      
      console.log(somedoc.data().description); //.data() returns data object
      document.getElementById("description").innerHTML = somedoc.data().description; //using javascript to display the data on the right place
      document.getElementById("nameGoesHere").innerHTML = somedoc.data().name;
      document.getElementById("activity-image").src = somedoc.data().picture;
      //  document.getElementById("activity-image").style.height = "50vh";  //데스크탑 화면으로 사진 크기 조정하고 싶다면

      document.getElementById("timeGoesHere").innerHTML = somedoc.data().time;
      document.getElementById("inoutGoesHere").innerHTML = somedoc.data().inout;
      document.getElementById("energyGoesHere").innerHTML = somedoc.data().energy;
      document.getElementById("costGoesHere").innerHTML = somedoc.data().cost;
      document.getElementById("groupGoesHere").innerHTML = somedoc.data().group;
      document.getElementById("proximityGoesHere").innerHTML = somedoc.data().proximity;

      //Here are other ways to access key:value data fields
      //$('#quote-goes-here').text(tuesdayDoc.data().quote);                                       //using jquery object dot notation
      //$("#quote-goes-here").text(tuesdayDoc.data()["quote"]);                                    //using json object indexing
    });
}
readActivity(); //calling the function

function addToFavourites() {
  console.log("add to favourites");
  // get userid from firebase
  firebase.auth().onAuthStateChanged((user) => {
    // Check if a user is signed in:
    if (user) {
      user_ID = user.uid;
      // add to favourites in firebase
      db.collection("users")
        .doc(user_ID)
        .update({
          favourites: firebase.firestore.FieldValue.arrayUnion(
            //
            // need to change activity id to a variable
            // need to update this to the variable
            //
            "B8Cg3zNu1H8G7H3BRPxK"
          ),
        });
    } else {
      if (confirm("Please sign in to add to your favorites!")) {
        window.location.href = "/signin.html";
      }
    }
  });
}
