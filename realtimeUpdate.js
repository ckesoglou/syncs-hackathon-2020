
// for (let i = 0; i < numUsers; i++) {
// }


// let inputHeading01Enabled = true;

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
  //   console.log(doc.data().content);
  let headingNum = `${doc.id}`.substring(4);
  console.log(`${doc.id}`.substring(4)); // removes "text" from id to get number
  console.log("REREREEER" + document.querySelector(`#heading${headingNum}`));
  
  if (document.querySelector(`#heading${headingNum}`).getAttribute("value") === "enabled") {
    document.querySelector(`#heading${headingNum}`).innerHTML = doc.data().content;
  }
}

function stopListening(element) {
  element.setAttribute("value", "disabled");
  console.log(element.getAttribute("value"));
  console.log(element.id + ' ENABLED');
}

function startListening(element) {
  element.setAttribute("value", "enabled");
  console.log(element.getAttribute("value"));
  console.log(element.id + " DISABLED");
}

getRealtimeVenueUpdates();