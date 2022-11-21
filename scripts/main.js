// logout firestore
signOut = function signOut() {
	firebase
		.auth()
		.signOut()
		.then(() => {
			// Sign-out successful.
			window.location.href = '/home/home.html';
		})
		.catch((error) => {
			// An error happened.
		});
};

firebase.auth().onAuthStateChanged(function (user) {
	const element = document.getElementById('sign-in-or-out');
	const favourites = document.getElementById('favourites');
	if (user) {
		element.innerHTML = 'Sign Out';
		element.onclick = signOut;
	} else {
		favourites.href = '#';
		favourites.onclick = function () {
			if (confirm('Please sign in to view your favourites!')) {
				window.location.href = '/signin.html';
			}
		};
		element.innerHTML = 'Sign In';
		element.onclick = function () {
			window.location.href = '/signin.html';
		};
	}
});
