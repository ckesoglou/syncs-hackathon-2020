const inputHeading02 = document.querySelector("#heading02");

getRealtimeVenueUpdates = function () {
  docRef.onSnapshot(function (querySnapshot) {
      // var allUsers = [];
      querySnapshot.docChanges().forEach(function (change) {
          // if (change.type === "added") {
              renderAccount(change.doc);
          // }
      })
      // console.log("All guests: ", allUsers.join(", "));
  });
}

function renderAccount(doc) {
  console.log(doc.data().content);
  
  inputHeading02.innerHTML = doc.data().content;
  // inputHeading01.innerHTML = doc.data().content;
}

getRealtimeVenueUpdates();