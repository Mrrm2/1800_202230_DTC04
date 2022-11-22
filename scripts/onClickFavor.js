// If you wanna use local storage 🦄 - but doesn't work in this case anyway
// var actName = localStorage.getItem("Paint and Sip"); // key랑 value가 똑같아서 사실 필요없음ㅋ
var currActivity = '';

async function readActivity() {
	let params = new URL(window.location.href);
	// let activityID = params.searchParams.get("activityID")
	let name = params.searchParams.get('name');

	await db
		.collection('activities_example')
		.where('name', '==', name)
		.get()
		.then((somedoc) => {
			// console.log(somedoc.docs[0].data()) //checking
			document.getElementById('description').innerHTML =
				somedoc.docs[0].data().description; //using javascript to display the data on the right place
			document.getElementById('activity-title').innerHTML =
				'<h2>' + somedoc.docs[0].data().name + '</h2>';
			document.getElementById('activity-image').src =
				somedoc.docs[0].data().picture;
			//  document.getElementById("activity-image").style.height = "50vh";  //데스크탑 화면으로 사진 크기 조정하고 싶다면

			document.getElementById('timeGoesHere').innerHTML =
				somedoc.docs[0].data().time;
			document.getElementById('inoutGoesHere').innerHTML =
				somedoc.docs[0].data().inout;
			document.getElementById('energyGoesHere').innerHTML =
				somedoc.docs[0].data().energy;
			document.getElementById('costGoesHere').innerHTML =
				somedoc.docs[0].data().cost;
			document.getElementById('groupGoesHere').innerHTML =
				somedoc.docs[0].data().group;
			document.getElementById('proximityGoesHere').innerHTML =
				somedoc.docs[0].data().proximity;
			currActivity = somedoc.docs[0].id;

			//Here are other ways to access key:value data fields
			//$('#quote-goes-here').text(tuesdayDoc.data().quote);                                       //using jquery object dot notation
			//$("#quote-goes-here").text(tuesdayDoc.data()["quote"]);                                    //using json object indexing
		});
}

document.getElementById('backToFav').addEventListener('click', goBack);

function goBack() {
	history.back();
}

function setFavouriteButton() {
	// for if activity is not favourite
	$('#favourite').html(`
      Favourite <i class='bi bi-star'></i>
    `);
}

function setUnfavouriteButton() {
	// for if activity is favourite

	$('#favourite').html(`
      Unfavourite <i class='bi bi-star-fill' style = 'color: rgb(255, 210, 48);'></i>
      `);
}

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

$('#favourite').click(function () {
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
});

function reactiveFavouriteButton() {
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
}

$(document).ready(async function () {
	// check if user is logged in
	await readActivity();
	reactiveFavouriteButton();
});
