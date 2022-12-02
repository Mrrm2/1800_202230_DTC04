// Function for adding activity information from a txt file to firestore
async function getCSVdata() {
	const response = await fetch('/activities_example.txt'); //send get request
	const data = await response.text(); //get file response
	const list = data.split('\r\n').slice(1); //get line
	list.forEach((row) => {
		const columns = row.split(';'); //get token
		const name = columns[0];
		const description = columns[1];
		const cost = columns[2];
		const time = columns[3];
		const proximity = columns[4];
		const group = columns[5];
		const energy = columns[6];
		const inout = columns[7];
		const picture = columns[8];

		// add data to firestore
		db.collection('activities_example').add({
			name: name,
			description: description,
			cost: cost,
			time: time,
			proximity: proximity,
			group: group,
			energy: energy,
			inout: inout,
			picture: picture,
		});
	});
}
