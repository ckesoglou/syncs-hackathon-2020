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
const numUsers = 6;
const usernames = [
  "Gemly",
  "hjsith",
  "Kevin",
  "Scorcher",
  "silverirridium",
  "st",
];

for (let i = 0; i < numUsers; i++) {
  var laneHeading = document.createElement("h6");
  laneHeading.setAttribute("style", "text-align: right; color:white;");
  laneHeading.innerHTML = `${usernames[i]}`;
  document.getElementById('savedChatBody').appendChild(laneHeading);

  var heading = document.createElement("h5");
  heading.setAttribute("id", "heading" + (i + 1));
  heading.setAttribute("onfocus", "stopListening(this)");
  heading.setAttribute("onfocusout", "startListening(this)");
  heading.setAttribute("contenteditable", true);
  // heading.setAttribute("style", "text-align: right;text-overflow:ellipsis ellipsis;");
  heading.setAttribute("style", "text-align: right; white-space: nowrap; overflow: scroll;color:white;");
  heading.setAttribute("value", "enabled");
  document.getElementById('savedChatBody').appendChild(heading);
  heading.innerHTML = "Please Type Here, Player " + (i + 1);
  
  var br = document.createElement("br");
  document.getElementById('savedChatBody').appendChild(br);

  document.querySelector("#heading" + (i + 1)).addEventListener("keydown", (e) => {
    if (e.key.length === 1 && e.key === ' ') {
      updateText(i + 1);
    }
  });
}

function updateText(headingNumber) {
  docRef
    .doc("text" + headingNumber)
    .set({
      content: document.querySelector("#heading" + headingNumber).innerHTML,
    })
    .then(function () {
      console.log(`text${headingNumber}: ${document.querySelector("#heading" + headingNumber).innerHTML}`);
    })
    .catch(function (error) {
      console.log("Got an error: ", error);
    });
}

particlesJS.load('particles-js', 'assets/particles.json', function () {
  console.log('callback - particles.js config loaded');
});
