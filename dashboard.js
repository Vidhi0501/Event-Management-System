import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCoNxIs855O9WkiLOJkXTf4Kg45EK-Cocs",
    authDomain: "vetrivel-c8711.firebaseapp.com",
    databaseURL: "https://vetrivel-c8711-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vetrivel-c8711",
    storageBucket: "vetrivel-c8711.appspot.com",
    messagingSenderId: "123328633210",
    appId: "1:123328633210:web:797094ecd85111b2011ec3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const user = auth.currentUser;

//runs on login and loguot
onAuthStateChanged(auth, (user) =>{
   
    console.log(user)
    if(user){
        // user signed in call
        updateUserProfile(user);
        const uid = user.uid;  // Fixed: Changed user,uid to user.uid
        return uid;

    } else {
        //user is not signed in 
        alert("create account and login");
        window.location.herf = "/register.html";
    }
});





// function to update user profile
function updateUserProfile(user){
    const userName =  user.displayName;
    const userEmail = user.email;
    //const userProfilePicture = user.photoURL;

    //update profile
    document.getElementById("userName").textContent=userName;
    document.getElementById("userEmail").textContent=userEmail;
    //document.getElementById("userEmail").textContent=userName;
}
document.addEventListener('DOMContentLoaded', function() {
    const greetingElement = document.getElementById("greeting");
    const detailsElement = document.getElementById("details");
    const logoutBtn = document.getElementById("logoutBtn");

    // Listen to authentication state changes
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is logged in
            const displayName = user.displayName || "User"; // If displayName is not set, default to 'User'
            const email = user.email;

            // Update the greeting and user details
            greetingElement.innerText = `Hello, ${displayName}!`;
            detailsElement.innerText = `Email: ${email}`;

            // Change button text to logout
            logoutBtn.innerText = "Logout";
        } else {
            // If no user is signed in, redirect to login page
            window.location.href = "index.html";
        }
    });

    // Logout button event listener
    logoutBtn.addEventListener('click', function() {
        signOut(auth).then(() => {
            alert("Logged out successfully!");
            window.location.href = "index.html"; // Redirect to login page after logout
        }).catch((error) => {
            alert("Error logging out: " + error.message);
        });
    });
});
