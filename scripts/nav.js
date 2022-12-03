function checkSignIn() {
	firebase.auth().onAuthStateChanged((user) => {
		// Check if a user is signed in:
		if (user) {
			user_ID = user.uid;
			// redirect to community page if signed in
			window.location.href = '/html/community.html';
		} else {
			if (confirm('Please sign in to access this feature!')) {
				window.location.href = '/html/signin.html';
			} else {
				window.location.href = '/html/home.html';
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
			window.location.href = '/html/userProfile.html';
		} else {
			if (confirm('Please sign in to access this feature!')) {
				window.location.href = '/html/signin.html';
			} else {
				window.location.href = '/html/home.html';
			}
		}
	});
}
