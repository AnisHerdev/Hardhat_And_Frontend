const { ethers } = require("hardhat");

async function main() {
    // Replace with your deployed contract address
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const contractABI = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_message",
                    "type": "string"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "message",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_newMessage",
                    "type": "string"
                }
            ],
            "name": "updateMessage",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];

    // Get the signer (default account from Hardhat)
    const [signer] = await ethers.getSigners();

    // Create a contract instance
    const myContract = new ethers.Contract(contractAddress, contractABI, signer);

    // Example interaction: Call a function from the contract
    try {
        const result = await myContract.updateMessage("truffle is better than hardhat");
        console.log("Function result:", result);
    } catch (error) {
        console.error("Error interacting with the contract:", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });