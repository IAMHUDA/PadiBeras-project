const firebaseConfig = {
    apiKey: "AIzaSyBUnsLDJ3XosVCbulcAkalKc0yRacmGMoM",
    authDomain: "padiberas-e9171.firebaseapp.com",
    projectId: "padiberas-e9171",
    storageBucket: "padiberas-e9171.appspot.com",
    messagingSenderId: "874400049002",
    appId: "1:874400049002:web:fd5750b3337491d3e8e713",
    measurementId: "G-29MGV0HMVK"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();

  // Register function
  function register() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Add user to Firestore
        const user = userCredential.user;
        db.collection('users').doc(user.uid).set({
          email: email
        }).then(() => {
          console.log('User added to Firestore');
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User registered successfully",
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            window.location.href = 'index.html'; // Redirect to login page
          });
        }).catch((error) => {
          console.error('Error adding user to Firestore:', error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error adding user to Firestore: ' + error.message,
          });
        });
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error creating user: ' + error.message,
        });
      });
  }

  function goToLogin() {
    window.location.href = 'index.html';
  }


  // Login function
  function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('User logged in');
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User logged in successfully",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.href = 'home.html'; // Redirect to home page
        });
      })
      .catch((error) => {
        console.error('Error logging in');
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error logging in'
        });
      });
  }

  // Navigate to register page
  function goToRegister() {
    window.location.href = 'register.html';
  }

  // Fetch users function (Real-time updates)
  function fetchUsers() {
    console.log('Fetching users...');
    const usersList = document.getElementById('users');
    usersList.innerHTML = '';
    db.collection('users').onSnapshot((querySnapshot) => {
      usersList.innerHTML = ''; // Clear list before adding new data
      querySnapshot.forEach((doc) => {
        console.log('User found:', doc.data().email);
        const li = document.createElement('li');
        li.textContent = doc.data().email;
        usersList.appendChild(li);
      });
      console.log('Users list updated');
    }, (error) => {
      console.error('Error fetching users:', error);
    });
  }

  // Fetch users on load
  window.onload = fetchUsers;