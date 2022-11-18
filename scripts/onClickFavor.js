// If you wanna use local storage 🦄 - but doesn't work in this case anyway 
// var actName = localStorage.getItem("Paint and Sip"); // key랑 value가 똑같아서 사실 필요없음ㅋ 

function readActivity() { 
  let params = new URL(window.location.href)
  // let activityID = params.searchParams.get("activityID")
  let name = params.searchParams.get("name")

  db.collection("activities_example")
    .where("name", "==", name )
    .get() 
    .then(somedoc => {
      // console.log(somedoc.docs[0].data()) //checking
      document.getElementById("description").innerHTML = somedoc.docs[0].data().description; //using javascript to display the data on the right place
      document.getElementById("activity-title").innerHTML = "<h2>" + somedoc.docs[0].data().name + "</h2>";
      document.getElementById("activity-image").src = somedoc.docs[0].data().picture;
      //  document.getElementById("activity-image").style.height = "50vh";  //데스크탑 화면으로 사진 크기 조정하고 싶다면

      document.getElementById("timeGoesHere").innerHTML = somedoc.docs[0].data().time;
      document.getElementById("inoutGoesHere").innerHTML = somedoc.docs[0].data().inout;
      document.getElementById("energyGoesHere").innerHTML = somedoc.docs[0].data().energy;
      document.getElementById("costGoesHere").innerHTML = somedoc.docs[0].data().cost;
      document.getElementById("groupGoesHere").innerHTML = somedoc.docs[0].data().group;
      document.getElementById("proximityGoesHere").innerHTML = somedoc.docs[0].data().proximity;

      //Here are other ways to access key:value data fields
      //$('#quote-goes-here').text(tuesdayDoc.data().quote);                                       //using jquery object dot notation
      //$("#quote-goes-here").text(tuesdayDoc.data()["quote"]);                                    //using json object indexing
        });
}

readActivity();

document.getElementById("backToFav").addEventListener("click", goBack)

function goBack() {
  history.back()
}