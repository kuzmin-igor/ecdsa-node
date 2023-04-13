const express = require("express");
const app = express();
const cors = require("cors");
const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "032157ea24712dfda552bc2fbc8cfc83b0c09ed9c4aeb0f2215d817ae3e254c8": 100,
  "236449c24f93cf269544913514bd496f4b946a7cfb5eb3c1a3a6a81f3ed7bdab": 50,
  "c1b1220cde5987a13c14061522df12963e2373b8acda398678f078f566cd3bf2": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature, recoveryBit } = req.body;
  const message = {
    sender,
    amount,
    recipient
  }

  //Convert the message object to string.
  const msgStr = JSON.stringify(message);

  //Hash the message.
  const msgHash = hashMessage(msgStr);

  //Recover a public addres from a signature.
  const signatureBytes = Uint8Array.from(Buffer.from(signature, 'hex'));
  const publicKey = secp.recoverPublicKey(msgHash, signatureBytes, recoveryBit); //The recovery bit bumber should be replaced by a variable.
  const senderAddress = getAddressFromPublicKey(publicKey);

  if (sender !== toHex(senderAddress)) {
    res.status(400).send({ message: "Wrong signature, transaction could not be validated." });
  } else {
    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function hashMessage(msg) {
  msgBytes = utf8ToBytes(msg);
  msgHash = keccak256(msgBytes);
  return msgHash;
}

function getAddressFromPublicKey(publicKeyBytes) {
  return keccak256(publicKeyBytes.slice(1).slice(-20));
}