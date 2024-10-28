#1 install the hardhat module
npm install --save-dev hardhat

#2 create a hardhat file boilerplate
npx hardhat

#3 compile and deploy
npx hardhat run scripts/deploy.js


#4 create the react file 
#5 artifacts are crucial to connect frontend with smart contracts

#5 create finalDeploy to deploy to blockchain
#6 change the hardhat.config.js to add the blockchain deployment necessary keys

#for sepolia faucets : 
https://tokentool.bitbond.com/faucet/ethereum-sepolia

npm install dotenv

#final deployment after adding wallet and network
npx hardhat run --network sepolia scripts/finalDeploy.js


#Deployment of DAPP
npm run build

#use netlify to deploy the project