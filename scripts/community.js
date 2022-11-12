function communitySubmit() {
  let fname = document.getElementById("inputFirstName").value;
  let lname = document.getElementById("inputLastName").value;
  let email = document.getElementById("inputEmail4").value;
  let activityName = document.getElementById("activityName").value;
  let description = document.getElementById("description").value;
  let cost = document.querySelector('input[name="cost"]:checked').value;
  let time = document.querySelector('input[name="time"]:checked').value;
  let proximity = document.querySelector(
    'input[name="proximity"]:checked'
  ).value;
  let group = document.querySelector('input[name="group"]:checked').value;
  let energy = document.querySelector('input[name="energy"]:checked').value;
  let inout = document.querySelector('input[name="inout"]:checked').value;

  db.collection("community")
    .add({
      firstName: fname,
      lastName: lname,
      email: email,
      activityName: activityName,
      description: description,
      cost: cost,
      time: time,
      proximity: proximity,
      group: group,
      energy: energy,
      inout: inout,
    })
    .then(() => {
      window.location.href = "/home/home.html";
    });
}
