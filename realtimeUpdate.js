getRealtimeVenueUpdates = function () {
  docRef.onSnapshot(function (querySnapshot) {
    querySnapshot.docChanges().forEach(function (change) {
      renderAccount(change.doc);
    })
  });
}

function renderAccount(doc) {
  let headingNum = `${doc.id}`.substring(4);
  // console.log(`${doc.id}`.substring(4)); // removes "text" from id to get number
  if (document.querySelector(`#heading${headingNum}`) != null) {
    if (document.querySelector(`#heading${headingNum}`).getAttribute("value") === "enabled") {
      document.querySelector(`#heading${headingNum}`).innerHTML = doc.data().content;
    }
  }
}

function stopListening(element) {
  element.setAttribute("value", "disabled");
  console.log(element.id + ' ENABLED');
}

function startListening(element) {
  element.setAttribute("value", "enabled");
  console.log(element.id + " DISABLED");
}

getRealtimeVenueUpdates();