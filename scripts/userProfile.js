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
			// not logged in // 일어나지 않을 일이지만 그냥 씀
			console.log('no one is logged in');
		}
	});
}
populateInfo();

// $('body').on('click', "#edituser", function() {
// 	console.log('hi')
// 	const nodeList = document.querySelectorAll(".personalInfoFields");
// 	console.log(nodeList)
// 	document.querySelectorAll(".personalInfoFields").disabled = false;

// })

function editUserInfo() {
	console.log("inside function")
	// const nodeList = document.querySelectorAll(".personalInfoFields");
	// console.log(nodeList);

	let nodeList = document.querySelectorAll(".personalInfoFields")
	// .disabled = false;
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
