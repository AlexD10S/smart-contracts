import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    frontier: {
      url:  "http://127.0.0.1:9933",
      chainId: 42,
      accounts: [
        "0x99B3C12287537E38C90A9219D4CB074A89A16E9CDB20BF85728EBD97C343E342",
        "0xe2033d436ce0614acc1ee15bd20428b066013f827a15cc78b063f83ac0baae64",
        "0xa17dd5704f87a9cd9bf78b552dc5ffc501399f64cab4cd724589d4d6fbb42db5",
        "0x2e1d0fa418766f7a54421745631be952639ce5f68842a8ac80081cebfa64bdbf",
      ],
    },
    matic: {
      url:  process.env.ALCHEMY_URL,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
