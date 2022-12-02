////////////////////////
// 1. Get activity filters from local storage
// 2. Use filters to select a list of activities from firestore
// 3. Randomly select an activity from the list, display it, and remove from list1
// 4. Display activities
////////////////////////

var activities = db.collection('activities_example'); // change to the name of the collection

// 1. Get activity filters from local storage
var filters = JSON.parse(localStorage.getItem('filtersForGenerate'));
console.log(filters);
var listOfActivities = [];

async function grabActivities(filters) {
	// 2. Use filters to select a list of activities from firestore
	await activities.get().then((snapshot) => {
		snapshot.docs.forEach((doc) => {
			var activity = doc.data();
			// for each activity, check if it matches the filters
			if (
				(filters.cost == 'Any' ||
					activity.cost == 'Any' ||
					filters.cost == activity.cost) &&
				(filters.time == 'Any' ||
					activity.time == 'Any' ||
					filters.time == activity.time) &&
				(filters.proximity == 'Any' ||
					activity.proximity == 'Any' ||
					filters.proximity == activity.proximity) &&
				(filters.group == 'Any' ||
					activity.group == 'Any' ||
					filters.group == activity.group) &&
				(filters.energy == 'Any' ||
					activity.energy == 'Any' ||
					filters.energy == activity.energy) &&
				(filters.inout == 'Any' ||
					activity.inout == 'Any' ||
					filters.inout == activity.inout)
			) {
				// if it matches, add it to the list of activities
				listOfActivities.push(doc.id);
			}
		});
	});
	console.log(listOfActivities);
}

// 3. Randomly select an activity from the list, display it, and remove from list1
function selectRandomActivityFromList(listOfActivities) {
	// if there are no activities left, display a message
	if (listOfActivities.length == 0) {
		alert('No activities match your filters. Please try again.');
		return;
	}
	// randomly select an activity from the list
	var randomIndex = Math.floor(Math.random() * listOfActivities.length);
	var randomActivity = listOfActivities[randomIndex];
	return randomActivity;
}

// 4. Display activities
function readActivity(activityID) {
	let activityTemplate = document.getElementById('activity_template');
	activities // db.collection("activities_example");
		.doc(activityID) //name of the collection and documents should matach excatly with what you have in Firestore
		.onSnapshot((doc) => {
			let newcard = activityTemplate.content.cloneNode(true);
			//.data() returns data object
			console.log(doc.data().description);

			//using javascript to display the data on the right place
			newcard.querySelector('#description').innerHTML = doc.data().description;
			newcard.querySelector('#activity-title').innerHTML =
				'<h2>' + doc.data().name + '</h2>';
			newcard.querySelector('#activity-image').src = doc.data().picture;
			newcard.querySelector('#source').innerHTML = doc.data().picture;
			newcard.querySelector('#timeGoesHere').innerHTML = doc.data().time;
			newcard.querySelector('#inoutGoesHere').innerHTML = doc.data().inout;
			newcard.querySelector('#energyGoesHere').innerHTML = doc.data().energy;
			newcard.querySelector('#costGoesHere').innerHTML = doc.data().cost;
			newcard.querySelector('#groupGoesHere').innerHTML = doc.data().group;
			newcard.querySelector('#proximityGoesHere').innerHTML =
				doc.data().proximity;

			// attach
			document.getElementById('activity_list').appendChild(newcard);
		});
}

function setUnfavouriteButton() {
	// Sets button for if activity is favourite
	$('#favourite').html(`
      Unfavourite <i class='bi bi-star-fill' style = 'color: rgb(255, 210, 48);'></i>
      `);
}

function setFavouriteButton() {
	// Sets button for if activity is not favourite
	$('#favourite').html(`
      Favourite <i class='bi bi-star'></i>
    `);
}

reactiveFavouriteButton = function () {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			user_ID = user.uid;
			// check if activity id is in user's favourites
			db.collection('users')
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
};

function removeFavourite(ID, activity_ID) {
	db.collection('users')
		.doc(ID)
		.set(
			{
				favourites: firebase.firestore.FieldValue.arrayRemove(activity_ID),
			},
			{ merge: true }
		);
}

function addFavourite(ID, activity_ID) {
	db.collection('users')
		.doc(ID)
		.set(
			{
				favourites: firebase.firestore.FieldValue.arrayUnion(activity_ID),
			},
			{ merge: true }
		);
}

favourite = function () {
	console.log('clicked');
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			user_ID = user.uid;
			// check if activity id is in user's favourites
			db.collection('users')
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
			if (confirm('Please sign in to add to your favourites!')) {
				window.location.href = '/signin.html';
			}
		}
	});
};

skip = function () {
	$('#activity_list').empty();
	console.log('clicked');
	listOfActivities.splice(listOfActivities.indexOf(currActivity), 1);
	if (listOfActivities.length == 0) {
		if (
			confirm(
				'No more activities matching your filters. Please update your filters.'
			)
		) {
			window.location.href = '/home.html';
		}
	} else {
		currActivity = selectRandomActivityFromList(listOfActivities);
		readActivity(currActivity);
		reactiveFavouriteButton();
	}
};

$(document).ready(async function () {
	await grabActivities(filters);
	currActivity = selectRandomActivityFromList(listOfActivities);
	readActivity(currActivity);
	reactiveFavouriteButton();
});
