const listOfInput = document.querySelectorAll('.dropdown-item');
let userFilters = {
	cost: 'Any',
	time: 'Any',
	proximity: 'Any',
	group: 'Any',
	energy: 'Any',
	inout: 'Any',
};

// Function to change dropdown text to selection and put filters in the userFilters object
for (let input of listOfInput) {
	input.addEventListener('click', function () {
		// Set the value and key to be the filter value and filter name
		let value = input.innerHTML;
		let key = input.parentElement.parentElement.parentElement.id;

		// Change dropdown text to selected value
		input.parentElement.parentElement.children[0].innerHTML = value;

		// Add value and key into userFilters object
		if (value == 'None') {
			userFilters[key] = 'Any';
		} else {
			userFilters[key] = String(value);
		}
	});
}

$('.generate').click(function () {
	localStorage.setItem('filtersForGenerate', JSON.stringify(userFilters));
	window.location.href = '/activity-page/activity-template.html';

	// add these to activity generation page
	// console.log(JSON.parse(localStorage.getItem("filtersForGenerate")));
	// window.onload = JSON.parse(localStorage.getItem("filtersForGenerate"));
});

function displayName() {
	// get user information from firebase
	firebase.auth().onAuthStateChanged((user) => {
		// Check if a user is signed in:
		if (user) {
			user_Name = user.displayName;
			$('#welcomeBanner').text('Welcome, ' + user_Name + '!'); //using jquery
		} else {
			$('#welcomeBanner').text('Welcome, Guest!');
		}
	});
}

displayName();
