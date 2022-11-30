var currentUser;

function populateInfo() {
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			currentUser = db.collection('users').doc(user.uid);

			currentUser.get().then((userUID) => {
				let userName = userUID.data().name;
				let userEmail = userUID.data().email;
				let userSchool = userUID.data().school;
				let userCity = userUID.data().city;

				if (userName != null) {
					document.getElementById('nameInput').value = userName; //value에다 넣으면 되는구나
				}
				if (userEmail != null) {
					document.getElementById('emailInput').value = userEmail;
				}
				if (userSchool != null) {
					document.getElementById('schoolInput').value = userSchool;
				}
				if (userCity != null) {
					document.getElementById('cityInput').value = userCity;
				}
			});
		} else {
			// not logged in 
			console.log('no one is logged in');
		}
	});
}
populateInfo();


function editUserInfo() {
	let nodeList = document.querySelectorAll(".personalInfoFields")
	for (let i = 0; i < nodeList.length; i++) {
		nodeList[i].disabled = false;
	}
}

function saveUserInfo() {
	let userName = document.getElementById('nameInput').value;
	let userEmail = document.getElementById('emailInput').value;
	let userSchool = document.getElementById('schoolInput').value;
	let userCity = document.getElementById('cityInput').value;

	currentUser
		.update({
			// currentUser 다시 써서 var. // update()로 update
			name: userName,
			email: userEmail,
			school: userSchool,
			city: userCity
		})
		.then(() => {
			alert('Document successfully updated!💕');
		});
	let saveList = document.querySelectorAll(".personalInfoFields")
	for (let i = 0; i < saveList.length; i++) {
		saveList[i].disabled = true;
	}
}
