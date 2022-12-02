function getFavourites() {
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			// get favourited activities' ID from user
			currentUser = db.collection('users').doc(user.uid);
			currentUser.get().then((userDoc) => {
				var activityList = userDoc.data().favourites;
				activityLength = activityList.length;

				function displayList(collection) {
					let favouritesTemplate = document.getElementById(
						'favourites_template'
					);

					if (activityLength == 0) {
						$('#favourites_group').html(
							`<div style='text-align:center;padding-top:2em'> 
			  	<h5> You have no favourited activities yet! </h5>`
						);
					}

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
