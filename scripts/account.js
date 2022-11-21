function insertName() {
	firebase.auth().onAuthStateChanged((user) => {
		// Check if a user is signed in:
		if (user) {
			console.log(user.displayName);
			user_Name = user.displayName;

			$('#insertName').text(user_Name + '!'); //using jquery
		} else {
		}
	});
}

setup = function setup() {
	insertName();
	$('#name').click(nameHandler);
};

$(document).ready(setup);
