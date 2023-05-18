# NFT-Lab

This practical work contains several tasks for interacting with NFT smart contract using a simple front-end application. Here are the instructions you need to follow:

## Get started

To prepare for this lab work, the following steps are required:

1. Installed code editor (Visual Studio Code or an alternative one)

2. Installed [node js](https://nodejs.org/en)

3. You can check if the installation is successful by running the command `npm -v`

4. Installed the Metamask browser extension.

### For interacting with Q testnet you should

5. Connect Metamask to the Q testnet
   1. Network name: Q Testnet
   2. RPC URL: https://rpc.qtestnet.org
   3. Chain ID: 35443
   4. Currency symbol (with space): "Q "
   5. Block explorer URL: https://explorer.qtestnet.org

6. Create a new Metamask address (do not use a personal account so not to compromise your data)

7. Get test tokens to the created address using [Q faucet](https://faucet.qtestnet.org/)

8. Copy the code of lab work from GitHub. This can be done in the following ways: 
    * download the repository as a **zip archive** and unzip it to the desired location 
    * use the built-in "Clone Git Repository" function of Visual Studio Code Editor (here you will need to copy the link from the repository)

## Preparing contracts and front end parts

1. Open the folder with the lab from the previous step in the code editor

2. Create a copy of the `.env.example` file and name it `.env`

3. Get the private key of your account (that has test tokens on) in the Metamask
This can be done as follows: 
    * in the browser extension go to _Account details_
    * click on _Export private key_ and enter your Metamask password
    * copy the uncovered private key

4. Insert the copied private key into the `.env` file you created as the `PRIVATE_KEY` variable

5. Open a terminal in the code editor and enter the command: 
    ```bash
    npm install
    ``` 
    This command will install the necessary dependencies for the contract deployment and local operation of the frontend

6. After running the command above, enter the next command:
    ```bash
    npm run deploy-contracts
    ```
    This command will deploy the contract that is in the lab work. After the command is complete, the terminal will display the address of the contract. Please copy the address

7. In the `.env` file replace the value of the variable `VITE_ERC721_ADDRESS` with the copied address

    :warning: Before proceeding, if you are using **Windows OS**, you need to replace **line 14** in `package.json` file with following command:

    ```
    "start-web-client": "npm run copy-file-win && npm --prefix ./web-client run start"
    ```

8. In the terminal, enter the command:
    ```bash
    npm run start-web-client
    ```
    After its completion, there will be a link in the terminal to the front end application that has been set up locally.

9. Click on the link to open the front end application that works with the contracts you deployed.

:warning: **Save files after making changes to them**

## Tasks

**After successfully completing the preparation part, please complete the following tasks:**

1. Check the basic flow opeartion:
    * Mint an NFT with image links (you can upload the desired image to ipfs yourself or get the link to the image on Google :warning: please make sure that you have copied the link to the actual image :warning:)
    * Transfer an NFT to another address (this can be your second Metamask account)
    * Switch to that address to see the differences that will be in the interface
    * Use the address search. Take a look at your main and secondary accounts

After you have completed steps above, locate to the code editor and execute the following command `control + C`. After that the frontend will be halted

2. Transform an existing NFT contract into an [SBT](https://vitalik.ca/general/2022/01/26/soulbound.html) contract. To achieve that, add some necessary code in the `SimpleNFT.sol` file. The comments in the contract will guide you. Locate the file here: `NFT-LAB/core-contracts/contracts/SimpleNFT.sol`
 
   You will have to provide a simple solution that makes the issued tokens non-transferable. As a hint, you can look up for already existing SBT contracts to take away what can be used to complete the task

3. After you made changes to the `SimpleNFT.sol` file you need to redeploy the contract and restart the frontend part. The deployment instructions can be found in the steps 6-9 in the _Preparation part_ of the lab

4. After you added the required changed to make the contract an SBT, the transfer function on the front end will throw an error. If you see one, you successfully completed the task! 

## Optional Tasks

1. Take the address of the contract your friend deployed and follow the steps 7-9 in the _Preparation part_. You should see the NFTs your friend has minted. Also try to complete the step 1 in the _Tasks_ section

2. Some of the features of the contract you didn't deploy will not be available for you. Check what those features are and how they work

3. Enhance the front end to enable minting tokens to a specific address. The function `mintTo` is already in the contract and you will have to implement its support. Add a field in the front end form where you will be able to enter an address to receive an NFT or SBT upon minting. After introducing the changes, follow the steps 8-9 from the _Preparation_ part of the lab

## Good luck!
