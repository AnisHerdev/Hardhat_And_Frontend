const hre = require("hardhat");

async function main() {
    // Compile the contract if not already compiled
    await hre.run('compile');

    // Get the contract factory
    const TodoList = await hre.ethers.getContractFactory("TodoList");

    // Deploy the contract
    const todoList = await TodoList.deploy();

    // Wait for the deployment to finish
    await todoList.deployed();

    console.log("TodoList deployed to:", todoList.address);
}

// Handle errors and run the main function
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});