/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.28",
  networks: { // Corrected from 'network' to 'networks'
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/w_LClDaw5GFTsYcnFzFbiw3fMKV_kVml',
      accounts: ['cd67a436e19c32f675ac5aa96ce9f4912ce7666ec5bc28594e7b2f356365e23a'], // Private key must be a string
      // chainId: 11155111,
    },
    localhost: {
      url: "http://127.0.1:8545",
    }
  }
};