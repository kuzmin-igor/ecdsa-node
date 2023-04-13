## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

### How to operate

These are instuctions to prepare a project.

1. Run the generate-private-key.js located in the server/scripts folder in order to create one or multiple private and public keys.
2. We will use the second script sign-transaction.js in the same folder to simulate a wallet transaction. So before executing a transaction in a client app you need to sign a transaction with that script. Please update the private key and the transaction data before executing the script. The output will be the signature and the recovery bit to use in the client app.
3. Now with all that nformation you can opne the client app and create a transaction. In the wallet address put the address received by the generate-private-key.js script. The amount and the recipient should match the data in sign-transaction.js. The signature and the recovery bit should be the ones received by the sign-transaction.js as output.