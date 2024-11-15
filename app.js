// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyArP-6OS1a12buQZTaCf9PMaX4siK45rvo",
  authDomain: "chat-170.firebaseapp.com",
  projectId: "chat-170",
  storageBucket: "chat-170.firebasestorage.app",
  messagingSenderId: "437927173525",
  appId: "1:437927173525:web:2601966ee248b7088f6a9c",
  measurementId: "G-1J4N55WJJY"
  };
  
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore(app);
  
  // Reference to the messages collection
  const messagesRef = db.collection("messages");
  
  // Get message input and display elements
  const messageInput = document.getElementById("message-input");
  const messagesDiv = document.getElementById("messages");
  
  // Listen for new messages
  messagesRef.orderBy("timestamp").onSnapshot(snapshot => {
    messagesDiv.innerHTML = ""; // Clear existing messages
    snapshot.forEach(doc => {
      const message = doc.data();
      const messageElement = document.createElement("div");
      messageElement.classList.add("message");
      messageElement.textContent = `${message.sender}: ${message.text}`;
      messagesDiv.appendChild(messageElement);
    });
  });
  
  // Send message
  function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText !== "") {
      messagesRef.add({
        sender: "User",  // You can customize or dynamically assign a sender
        text: messageText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => {
        messageInput.value = ""; // Clear input after sending
      });
    }
  }
  