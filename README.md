# NFT-Lab

This practical work contains several tasks for interacting with solid contracts and the front-end. 
There we describe step-by-step instruction

## Get started

To prepare for this lab work, the following steps are required:
1. Installed code editor (Visual Studio Code is preferable)

2. Install node js (the steps will be different for each operating system)

3. You can check if the installation was successful by running the command npm -v 

4. Install the Metamask browser extension.

5. Create a new Metamask address 
(do not use a personal account so as not to compromise your data)

6. Get test tokens on the created address using [Q faucet](https://faucet.qtestnet.org/)

7. Copy the code of lab work from GitHub this can be done in several ways: 
    * download the repository as a zip archive and unzip it to the desired location 
    * use the built-in "Clone Git Repository" function of Visual Studio Code Editor (here you will need to copy the link from the repository)

## Main part

1. Open the folder with the lab from the previous step in the code editor

2. Create a copy of the `.env.example` file and name it `.env`

3. Find your private key from the account (the account must have test tokens) in the Metamask. 
This can be done as follows: 
    * in the browser extension go to Account details
    * click on Export private key and enter your password from the application Metamask
    * then you can see and copy your private key

4. Insert the copied private key into the created `.env` file as the `PRIVATE_KEY` variable.

5. Open a terminal in the code editor and enter the command: 
    ```bash
    npm install
    ``` 
    This step will install the necessary dependencies for the deployment and local operation of the frontend

6. After running the previous command, enter the command:
    ```bash
    npm run deploy-contracts
    ```
    This command will deploy the smart contracts that are in the lab work. After the command is finished, the terminal will have the address of the smart contracts, you have to copy them.

7. In the `.env file` replace the value of the variable `VITE_ERC721_ADDRESS` with the copied value.

8. In the terminal, enter the command:
    ```bash
    npm run start-web-client
    ```
    After its completion, there will be a link in the terminal to the front end which works locally.

9. When you click on the link, you will see the frontend part that will work with the contracts that we have deployed.

_** :warning: Save files after making changes to them**_

## Main Tasks
After successfully completing the Main part, you must complete the following tasks:
1. Check the operation of the basic flow:
    * Mint nft use picture links (You can download the desired images to ipfs or find pictures on google and use the :warning: Copy Image Address :warning: function)
    * Transfer nft to another address 
    * Switch to another address to see the differences that will be in the interface
    * Use the address search

After these steps in the terminal of the code editor you need to do the command `control + C` After that the frontend will not work locally

2. Make a contract for NFT mint into a contract for SBT mint. To do this, add some code in the file `SimpleNFT.sol` at the path `NFT-LAB/core-contracts/contracts` after the comment `// TODO: additional task`

3. After you have made changes to the `SimpleNFT.sol` file you need to redeploy and locally restart the frontend part, to do this you need to repeat steps 6-9 from the Main part. Then go through point 1 of the Main Tasks section

4. After your contract changes, the NFT transfer function should not work, check this point

## Additional Tasks

1. Take the address of the contract your friend plotted and follow steps 7-9 of the Main part. You should see the NFTs your friend has mined and also try to go through step 1 of the Main Tasks section. 

2. Some of the features on the contract that you did not create will not be available to you, so check to see what those features are.
