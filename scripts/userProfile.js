var currentUser;

function populateInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);

            currentUser.get()
                .then(userUID => {
                    let userName = userUID.data().name;
                    let userEmail = userUID.data().email;

                    if (userName != null) {
                        document.getElementById("nameInput").value = userName  //value에다 넣으면 되는구나
                    }
                    if (userEmail != null) {
                        document.getElementById("emailInput").value = userEmail;
                    }
                })
        } else { // not logged in // 일어나지 않을 일이지만 그냥 씀
            console.log("no one is logged in")
        }
    })
}
populateInfo()

function editUserInfo() {
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    let userName = document.getElementById("nameInput").value;
    let userEmail = document.getElementById("emailInput").value;

    currentUser.update({ // currentUser 다시 써서 var. // update()로 update    
        name: userName,
        email: userEmail
    })
        .then(() => {
            alert("Document successfully updated!💕")
        })
    document.getElementById('personalInfoFields').disabled = true;

}