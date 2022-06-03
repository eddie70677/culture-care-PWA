import {
  initializeApp
} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js'

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js'

const firebaseConfig = {
  apiKey: "AIzaSyCHATTd_7jFIZdtDgEm0ZpdBBCkZLnR4Q8",
  authDomain: "test1-d2430.firebaseapp.com",
  databaseURL: "https://test1-d2430-default-rtdb.firebaseio.com",
  projectId: "test1-d2430",
  storageBucket: "test1-d2430.appspot.com",
  messagingSenderId: "667660696375",
  appId: "1:667660696375:web:1832c31537b215575af8b2"
};

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const providersRef = collection(db, 'Providers')

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Get all providers that offer service from app
window.onload = () => {

  // Create a query against the collection.
  const service = capitalizeFirstLetter(localStorage.getItem('service'))
  const q = query(providersRef, where("Services", "array-contains", service));

  const add_after_me = document.getElementById('add_after_me');

  // Run query
  getDocs(q).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {

      const html = `
       <div class="card">
       <div class="card-container">
           <h1>${doc.data()['First Name']}<br>
           <h3>Contact Details</h3>
           <p>${doc.data()['Preferred Contact']}</p><br>
           <h3>Availability</h3>
           <p>${doc.data()['Availability']}</p><br>
           <h3>Services</h3>
           <p>${doc.data()['Services']}</p>

       </div>
       </div><br>`

      add_after_me.insertAdjacentHTML("afterend", html);
      console.log(doc.id, " => ", doc.data());
    });
  });
}
