function displayList(collection, activityLength, activityList) {
  let favouritesTemplate = document.getElementById('favourites_template');

  db.collection(collection)
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        var activityID = doc.id;

        // iterate through each activityID in favourites
        for (var i = 0; i < activityLength; i++) {
          if (activityList[i] == activityID) {
            var name = doc.data().name;
            var desc = doc.data().description;
            let newcard = favouritesTemplate.content.cloneNode(true);

            // update name and desc
            newcard.querySelector('#activityName').innerHTML = name;
            newcard.querySelector('#description').innerHTML = desc;

            //URL piggyback
            newcard.querySelector('.read-more').href =
              'onClickFavor.html?name=' + name;

            // attach
            document.getElementById('favourites_group').appendChild(newcard);
          }
        }
      });
    });
}

function getFavourites() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // get favourited activities' ID from user
      currentUser = db.collection('users').doc(user.uid);
      currentUser.get().then((userDoc) => {
        var activityList = userDoc.data().favourites;
        if (typeof activityList === 'undefined') {
          $('#favourites_group').html(
            `<div style='text-align:center;padding-top:2em'>
                <h5> You have no favourites yet! </h5>`
          );
        } else if (activityList.length == 0) {
          $('#favourites_group').html(
            `<div style='text-align:center;padding-top:2em'> 
                  <h5> You have no favourited activities yet! </h5>`
          );
        } else {
          activityLength = activityList.length;
          displayList('activities_example', activityLength, activityList);
        }
      });
    }
  });
}

getFavourites();
