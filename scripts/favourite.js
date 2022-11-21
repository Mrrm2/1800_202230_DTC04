// !!!! function to grab array of user's favorited activities !!!!

// function getFavorites() {
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       console.log("userID", user.uid);
//       currentUser = db.collection("users").doc(user.uid);
//       currentUser.get().then((userDoc) => {
//         var activityList = userDoc.data().favourites;
//         console.log(activityList);
//       });
//     }
//   });
// }

// getFavorites();

// !!!!!!! display activty by 1 activity ID !!!!!!!

// activityList = ["j73JbXqj7JhPXzNJ4TCM"];

// function displayList(collection) {
//   let favoritesTemplate = document.getElementById("favorites_template");

//   db.collection(collection)
//     .get()
//     .then((snap) => {
//       snap.forEach((doc) => {
//         var activityID = doc.id;
//         if (activityList == activityID) {
//           var name = doc.data().name;
//           var desc = doc.data().description;
//           let newcard = favoritesTemplate.content.cloneNode(true);

//           // update name and desc
//           newcard.querySelector("#activityName").innerHTML = name;
//           newcard.querySelector("#description").innerHTML = desc;

//           // attach
//           document.getElementById("favorites_group").appendChild(newcard);
//         }
//       });
//     });
// }

// displayList("activities_example");

// !!!!! final product:

function getFavourites() {
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			// get favourited activities' ID from user
			console.log('userID', user.uid);
			currentUser = db.collection('users').doc(user.uid);
			currentUser.get().then((userDoc) => {
				var activityList = userDoc.data().favourites;
				activityLength = activityList.length;

				function displayList(collection) {
					let favouritesTemplate = document.getElementById(
						'favourites_template'
					);

					db.collection(collection)
						.get()
						.then((snap) => {
							snap.forEach((doc) => {
								var activityID = doc.id;

								// iterate through each activityID in favourites
								for (var i = 0; i < activityLength; i++) {
									if (activityList[i] == activityID) {
										console.log(activityList[i]);
										var name = doc.data().name;
										var desc = doc.data().description;
										let newcard = favouritesTemplate.content.cloneNode(true);
										// getActID(name,name) // 🦄In case you wanna use local storage

										// update name and desc
										newcard.querySelector('#activityName').innerHTML = name;
										newcard.querySelector('#description').innerHTML = desc;

										//URL piggyback 🐷
										newcard.querySelector('.read-more').href =
											'onClickFavor.html?name=' + name;
										// +"&activityID=" + activityID;

										// attach
										document
											.getElementById('favourites_group')
											.appendChild(newcard);
									}
								}
							});
						});
				}
				displayList('activities_example');
			});
		}
	});
}

getFavourites();

// 🦄In case you wanna use local storage
// function getActID(actName, id) {
//   localStorage.setItem(actName, id)
// }
