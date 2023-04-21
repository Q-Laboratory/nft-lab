# NFT-Lab

## Setup Project

First you will need to configure the `.env` file, an example of which you can find in this folder.

One of the ways to do it is to copy the `.env.example` file and rename it to `.env`:

```bash
cp .env.example .env
```

Then you will need to replace `Deployer private key` with your private key.

Secondly, you will need to install all the dependencies:
```bash
npm install
```


## Deploy and Verify on Q Testnet

You can deploy and verify the contracts on a Q Testnet.
```bash
npm run deploy-qtestnet
```
