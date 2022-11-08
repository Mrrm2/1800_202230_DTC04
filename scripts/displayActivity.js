function readActivity() {
    db.collection("activities_example").doc("B8Cg3zNu1H8G7H3BRPxK")                                                      //name of the collection and documents should matach excatly with what you have in Firestore
      .onSnapshot(somedoc => {                                                               //arrow notation
           console.log(somedoc.data().description);                          //.data() returns data object
           document.getElementById("description").innerHTML = somedoc.data().description;      //using javascript to display the data on the right place
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
      })
}
readActivity();        //calling the function


$("body").on("click", ".backdropBtn", function () {
     console.log(`https://image.tmdb.org/t/p/w500/${$(this).attr('movieBackdropImageName')}`);
     $("aside").html(
   // $("main").append(
       `
         <img src="https://image.tmdb.org/t/p/w500/${$(this).attr('movieBackdropImageName')}"> 
       `
     )
   })

   for (i = 0; i < data.results.length; i++) {
    $("main").append(
      `
      <div>
        ${data.results[i].title}
        <p>
          ${data.results[i].overview}
        </p>
        <img 
          src="https://image.tmdb.org/t/p/w500/${data.results[i].poster_path}"
          style="width: 100%" 
        >
        <button movieBackdropImageName="${data.results[i].backdrop_path}" class="backdropBtn"> BackDrop Image </button>
        <hr>
      </div>
      `
    ) // width: 100% - div 안에서만 있고 overflow되지 않게 함 
    
      ;
  }