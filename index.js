// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: firebaseAPIKey,
  authDomain: "syncs-hackathon-2020.firebaseapp.com",
  databaseURL: "https://syncs-hackathon-2020.firebaseio.com",
  projectId: "syncs-hackathon-2020",
  storageBucket: "syncs-hackathon-2020.appspot.com",
  messagingSenderId: "251371526788",
  appId: "1:251371526788:web:01dfb6363ebbb3eb7540d1",
  measurementId: "G-0DMMT5PYBV",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

const docRef = db.collection("rooms").doc("room01").collection("users");

// const inputHeading01 = document.querySelector("#heading01");
// const inputHeading02 = document.querySelector("#heading02");
const saveButton = document.querySelector("#saveButton");

const numUsers = 4;

for (let i = 0; i < numUsers; i++) {
  var element = document.createElement("h5");
  element.setAttribute("id", "heading" + (i + 1));
  element.setAttribute("onfocus", "stopListening(this)");
  element.setAttribute("onfocusout", "startListening(this)");
  element.setAttribute("contenteditable", true);
  element.setAttribute("style", "text-align: right");
  element.setAttribute("value", "enabled");
  document.getElementById('savedChatBody').appendChild(element);
  element.innerHTML = "Please Type Here, Player " + i;

  document.querySelector("#heading" + (i + 1)).addEventListener("keydown", (e) => {
    if (e.key.length === 1 && e.key === ' ') {
      updateText(i + 1);
    }
  });
}

// saveButton.addEventListener("click", function () {
//   updateText();
// });

function updateText(headingNumber) {
  // const textHeading01 = document.querySelector("#heading01").innerHTML;
  docRef
    .doc("text" + headingNumber)
    .set({
      content: document.querySelector("#heading" + headingNumber).innerHTML,
    })
    .then(function () {
      console.log(`text${headingNumber} updated!`);
    })
    .catch(function (error) {
      console.log("Got an error: ", error);
    });
}

particlesJS.load('particles-js', 'assets/particles.json', function () {
  console.log('callback - particles.js config loaded');
});

// const seanStream = document.querySelector("#heading01");
// const seanSavedStream = document.querySelector("#heading01_Saved");
//seanStream.addEventListener("keydown", (e) => {
//  if (e.key.length === 1 && e.key === ' ') {
//    updateText();
//    seanSavedStream.innerHTML = seanStream.innerHTML;
//  }
//});


