const hre = require("hardhat");

async function main() {
    // Compile the contract if not already compiled
    // await hre.run('compile');

    // Deploy the contract
    const MyContract = await hre.ethers.getContractFactory("MyContract");
    const myContract = await MyContract.deploy("Hello, Hardhat!");

    await myContract.deployed();

    console.log("MyContract deployed to:", myContract.address);
}

// Handle errors and run the script
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});