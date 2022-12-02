function displayList(collection, activityLength, submissionList) {
	let submissionTemplate = document.getElementById('submission_template');

	db.collection(collection)
		.get()
		.then((snap) => {
			snap.forEach((doc) => {
				var submissionID = doc.id;

				// iterate through each submissionID in favourites
				for (var i = 0; i < activityLength; i++) {
					if (submissionList[i] == submissionID) {
						var name = doc.data().activityName;
						var desc = doc.data().description;
						let newcard = submissionTemplate.content.cloneNode(true);

						// update name and desc
						newcard.querySelector('#activityName').innerHTML = name;
						newcard.querySelector('#description').innerHTML = desc;

						// attach
						document.getElementById('favourites_group').appendChild(newcard);
					}
				}
			});
		});
}

function getSubmissions() {
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			// get favourited activities' ID from user
			currentUser = db.collection('users').doc(user.uid);
			currentUser.get().then((userDoc) => {
				var submissionList = userDoc.data().submissions;
				activityLength = submissionList.length;

				if (activityLength == 0) {
					$('#favourites_group').html(
						`<div style='text-align:center;padding-top:2em'> 
			  	<h5> You haven't submitted any activities yet! </h5>`
					);
				}

				displayList('community', activityLength, submissionList);
			});
		}
	});
}

getSubmissions();
