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

// const input01 = document.querySelector("#text01");
const inputHeading01 = document.querySelector("#heading01");
const saveButton = document.querySelector("#saveButton");

const userNumber = 4;
for (i =0; i < userNumber; i++) {
    var element = document.createElement("h5");
    element.setAttribute("id", "heading" + (i + 1));
    document.getElementById('savedChatBody').appendChild(element);
    element.innerHTML = "Hello " + i;
}

saveButton.addEventListener("click", function () {
  updateText01();
});

function updateText01() {
  const text01 = inputHeading01.value;
  const textHeading01 = inputHeading01.innerHTML;
  docRef
    .doc("text01")
    .set({
      content: textHeading01,
    })
    .then(function () {
      console.log("text01 update!");
    })
    .catch(function (error) {
      console.log("Got an error: ", error);
    });
}

particlesJS.load('particles-js', 'assets/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });

const seanStream = document.querySelector("#heading01");
const seanSavedStream = document.querySelector("#heading01_Saved");
seanStream.addEventListener("keydown", (e) => {
  if (e.key.length === 1 && e.key === ' ') {
    updateText01();
    seanSavedStream.innerHTML = seanStream.innerHTML;
  }
});


