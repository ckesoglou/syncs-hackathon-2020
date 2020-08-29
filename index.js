var docRef;

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
const db = firebase.firestore();

particlesJS.load("particles-js", "assets/particles.json", function () {
  console.log("callback - particles.js config loaded");
});

var login = document.getElementById("login");
var loginButton = document.getElementById("loginButton");

window.addEventListener('load', (event) => {
  const settings = JSON.parse(window.localStorage.getItem("settings"));

  if (settings != null
    && settings.hasOwnProperty("displayName")
    && settings.hasOwnProperty("roomName")) {
    startChatApp(settings);
  }
  else {
    login.style.display = "block";
  }
})

clear.onclick = () => {
  window.localStorage.clear();
  alert("You've cleared local storage! GL brutha!");
  location.reload();
}


loginButton.onclick = () => {
  let displayName = document.getElementById("displayname").value;
  let roomName = document.getElementById("roomname").value;
  if (displayName && roomName) {
    window.localStorage.setItem("settings", JSON.stringify({
      displayName: displayName,
      roomName: roomName,
    }))
    login.style.display = "none";

    startChatApp(JSON.parse(window.localStorage.getItem("settings")));
  }
}

function startChatApp(settings) {
  docRef = db.collection("rooms").doc(settings.roomName).collection("users");

  var users = [];

  docRef.get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log("Found user: " + doc.data().displayName);
        users.push({
          displayName: doc.data().displayName,
          initialText: doc.data().content
        });
      });
    })
    .then(() => {
      if (!users.some(user => user.displayName === settings.displayName)) {
        users.push({
          displayName: settings.displayName,
          initialText: "Please type here, " + settings.displayName
        })
      }

      users.forEach(user => {
        createChatForUser(user.displayName, user.initialText);
      });
      document.getElementById("clear").setAttribute("style", "display: block");
    })
    .then(() => getRealtimeVenueUpdates());


  getRealtimeVenueUpdates = function () {
    docRef.onSnapshot(function (querySnapshot) {
      querySnapshot.docChanges().forEach(function (change) {
        renderAccount(change.doc);
      })
    });
  }
}

function renderAccount(doc) {
  let shortDisplayName = doc.id;
  if (document.querySelector(`#${shortDisplayName}`) === null) {
    createChatForUser(doc.data().displayName, doc.data().content);
  }
  if (document.querySelector(`#${shortDisplayName}`).getAttribute("value") === "enabled") {
    document.querySelector(`#${shortDisplayName}`).innerHTML = doc.data().content;
  }
}

function createChatForUser(displayName, initialText) {
  let shortDisplayName = displayName.replace(/\s+/g, '') // strip all white space from username

  var chatUser = document.createElement("h6");
  chatUser.setAttribute("style", "text-align: center; color:white;");
  chatUser.innerHTML = displayName;
  document.getElementById("savedChatBody").appendChild(chatUser);

  var chatLine = document.createElement("h5");
  chatLine.setAttribute("id", shortDisplayName);
  // chatLine.className += "text";
  chatLine.setAttribute("onfocus", "stopListening(this)");
  chatLine.setAttribute("onfocusout"
    , "startListening(this)");

  const settings = JSON.parse(window.localStorage.getItem("settings"));
  if (displayName === settings.displayName) {
    chatLine.setAttribute("contenteditable", true);
    chatLine.setAttribute("class", "chosenChatLine")
  }

  // heading.setAttribute("style", "text-align: right;text-overflow:ellipsis ellipsis;");

  chatLine.setAttribute(
    "style",
    "text-align: center; white-space: nowrap; overflow: hidden;color:white;"
  );
  chatLine.setAttribute("value", "enabled");
  document.getElementById("savedChatBody").appendChild(chatLine);
  chatLine.innerHTML = initialText;

  document.getElementById("savedChatBody").appendChild(document.createElement("br"));

  document
    .querySelector("#" + shortDisplayName)
    .addEventListener("keydown", (e) => {
      if (e.key.length === 1 && e.key === " ") {
        updateText(displayName);
      }
    });
}

function updateText(displayName) {
  let shortDisplayName = displayName.replace(/\s+/g, '') // strip all white space from username
  docRef
    .doc(shortDisplayName)
    .set({
      content: document.querySelector("#" + shortDisplayName).innerHTML,
      displayName: displayName
    })
    .then(function () {
      console.log(
        `Text for #${shortDisplayName}: ${
        document.querySelector("#" + shortDisplayName).innerHTML
        }`
      );
    })
    .catch(function (error) {
      console.log("Got an error: ", error);
    });
}


function stopListening(element) {
  element.setAttribute("value", "disabled");
  element.classList.add('notransition')
  console.log(element.id + ' ENABLED');
}

function startListening(element) {
  element.classList.remove('notransition');
  element.setAttribute("value", "enabled");
  console.log(element.id + " DISABLED");
}