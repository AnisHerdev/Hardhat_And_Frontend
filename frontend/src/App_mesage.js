import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractData from "./MyContract.json"; // ✅ Import ABI

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS; // ✅ Ensure this is set in .env

function App() {
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchMessage();
  }, []);

  async function fetchMessage() {
    try {
      if (!window.ethereum) {
        console.error("MetaMask not installed!");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractData.abi, provider);
      
      const fetchedMessage = await contract.message();
      setMessage(fetchedMessage);
    } catch (error) {
      console.error("Error fetching message:", error);
    }
  }

  async function updateMessage() {
    try {
      if (!window.ethereum) {
        console.error("MetaMask not installed!");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractData.abi, signer);

      const tx = await contract.updateMessage(newMessage);
      await tx.wait();

      fetchMessage(); // Refresh message after updating
    } catch (error) {
      console.error("Error updating message:", error);
    }
  }

  return (
    <div>
      <h1>Current Message: {message}</h1>

      <input
        type="text"
        id="messageInput" // ✅ Added id
        name="message"    // ✅ Added name
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />

      <button onClick={updateMessage}>Update Message</button>
    </div>
  );
}

export default App;