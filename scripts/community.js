function communitySubmit() {
  firebase.auth().onAuthStateChanged((user) => {
    let uid = user.uid;
    let fname = user.displayName;
    let email = user.email;
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
        uid: uid,
        firstName: fname,
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
        alert("Thank you.💕 Your suggestion received successfully!")
        window.location.href = "/home/home.html";
      });
  });
}
