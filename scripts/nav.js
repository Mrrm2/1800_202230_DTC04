function checkSignIn() {
	firebase.auth().onAuthStateChanged((user) => {
		// Check if a user is signed in:
		if (user) {
			user_ID = user.uid;
			// redirect to community page if signed in
			window.location.href = '/community.html';
		} else {
			if (confirm('Please sign in to access this feature!')) {
				window.location.href = '/signin.html';
			} else {
				window.location.href = '/home.html';
			}
		}
	});
}

function check_SignIn() {
	firebase.auth().onAuthStateChanged((user) => {
		// Check if a user is signed in:
		if (user) {
			user_ID = user.uid;
			// redirect to community page if signed in
			window.location.href = '/userProfile.html';
		} else {
			if (confirm('Please sign in to access this feature!')) {
				window.location.href = '/signin.html';
			} else {
				window.location.href = '/home.html';
			}
		}
	});
}
