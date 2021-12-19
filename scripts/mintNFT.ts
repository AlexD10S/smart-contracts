import { ethers } from "hardhat";
import * as dotenv from "dotenv";

import D10SNFT from "../artifacts/contracts/D10SNFT.sol/D10SNFT.json";

dotenv.config();

async function main() {
    const D10SNFTAddress = "0xC6a7b3538E61bb88B9ABC7cCF2f231E5D9781695";
    const nftsToMint = [
        "https://ipfs.io/ipfs/QmfHZraw51rBix2ZZdxD7LWaX5QJMWC9SLw6jr47RjyeDZ?filename=68.json",
        "https://ipfs.io/ipfs/QmdMGRRe8WWq4PPgX7aWzstdqHDuPXWa8vvQrYBZ268ncS?filename=73.json", 
        "https://ipfs.io/ipfs/Qmf8H27uEwToXFrssiWmeVSXTh9EdGkjp73o7udaQkoHuu?filename=76.json",
        "https://ipfs.io/ipfs/QmS8ynvM1dFPjbGTP2kk8RqAuf4sqezZE4DGsR3Z9oCiH9?filename=77.json",
        "https://ipfs.io/ipfs/QmSHJpaGMNqp8UQFmGNoACfzfwSS493fMDXjHXYZePok7B?filename=78.json",
        "https://ipfs.io/ipfs/QmUj7BeRnLkKUJ8TDCysEJgJ7Eu3CkatfZ6f3Zg42Xe9ux?filename=79.json",
        "https://ipfs.io/ipfs/QmR3WaMZNnBi8PY5DedCTqRsGdJWnq9UDuFA4pUFbzZ7J8?filename=80.json",
        "https://ipfs.io/ipfs/QmfEfXPExf69LpsiMaFH1nrPDTuyYecuFm29HdDFyafu35?filename=81.json",
        "https://ipfs.io/ipfs/QmavzXw9zWsW8Fg5Bk1uizgXeGwytbpJh5Reyivfx1mV6B?filename=82.json",
        "https://ipfs.io/ipfs/QmUA7NXXN8BnhnUDsXXHC118Ffh2aXUj3XtAfSSnpM5nWr?filename=83.json",
        "https://ipfs.io/ipfs/QmVKZ3BKWketKecZAPSD2NrxNmb1R7GGVwpbXBWwKQ6zsL?filename=84.json",
        "https://ipfs.io/ipfs/QmeAM8rR1eq79PTk24WHjBbptQ1cvbk5KsMBWuijK4X6cr?filename=85.json",
        "https://ipfs.io/ipfs/Qmem3JP7cBbXPh7SVvbruphSN3tqHtQa1wzMVrAbJdYnUq?filename=86.json",
        "https://ipfs.io/ipfs/QmfXtze5uHMCuyc36ctw1Q3iDR5REsCiktWfSeG64SMWwD?filename=87.json",
        "https://ipfs.io/ipfs/QmSUQWG84V1XEyE6XFcPTCmTUA8pWWHCznXCL35SLLd7C1?filename=88.json",
        "https://ipfs.io/ipfs/QmbvpsG91rG1K6B2fMojJtCdLn8DAzHVSQ3USiVBAnH3MC?filename=89.json",
        "https://ipfs.io/ipfs/QmaSVpBVStfeBR52AAcGUqtFv2Y4d8eqxH5H3ZVeWkApEZ?filename=90.json",
        "https://ipfs.io/ipfs/Qmc1SdBKZtoiJF1dZxMFCBm8jYWkbZWty3J2do72dbjUjk?filename=91.json",
        "https://ipfs.io/ipfs/QmXBvi7DzGZZLGWat8wuxxgoztvZToMATqtN1UBMc4cvso?filename=92.json",
        "https://ipfs.io/ipfs/QmbMNPdTTCQD1eNn6FCJFckphrQ8iQKshr3RjQPB8PvFUn?filename=93.json",
        "https://ipfs.io/ipfs/QmWEi1KNd6SJNuDnsWjovimt8wEQ5XBzQ1GLkANE9Xis8t?filename=94.json",
        "https://ipfs.io/ipfs/QmcsA1TbUSs97UZ5JYZSMPQLyMA7hdZFGfnv1Tfz3jwyxA?filename=95.json",
        "https://ipfs.io/ipfs/QmZJoaQ4PWybNpcmw8JJ3NABw6gD5gdFsWssgM3z9wAYga?filename=96.json",
        "https://ipfs.io/ipfs/Qme975LwFGqc8wqJYXfYKtzzBiWW4wuGubpHTDrDf414Dj?filename=97.json"
    ]

    const provider = new ethers.providers.AlchemyProvider(
        "matic"
    );

    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || '', provider); // getting your wallet

    const d10sNFTContract = new ethers.Contract(
        D10SNFTAddress, D10SNFT.abi,  wallet 
    );
    console.log(process.env.PRIVATE_KEY);

    console.log("minting");
    for (let i = 0; i < nftsToMint.length; i++) {
       
        const transaction = await d10sNFTContract.createToken(nftsToMint[i]); // interacting with the contract
        const tx = await transaction.wait(); // waiting the minting of the block
        const event = tx.events[0];
        const value = event.args[2];
        const tokenId = value.toNumber(); // getting the created tokenId
    
        console.log({
        transaction,
        tx,
        tokenId,
        });
    }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});