const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

const PRIVATE_KEY = "8e89b7e7f3cfc0304d4fcedb871f90345da7cf38ed28f37251f93db63fdea0bc";

async function signTransaction(sender, amount, recipient) {
    const message = {
        sender,
        amount,
        recipient
    }

    //Convert the message object to string.
    const msgStr = JSON.stringify(message);

    //Hash the message.
    const msgHash = hashMessage(msgStr);

    //Sign the message.
    const [signature, recoveryBit] = await signMessage(msgHash);

    return [toHex(signature), recoveryBit];
}

function hashMessage(msg) {
    msgBytes = utf8ToBytes(msg);
    msgHash = keccak256(msgBytes);
    return msgHash;
}

async function signMessage(msgHash) {
    const privateKeyBytes = Uint8Array.from(Buffer.from(PRIVATE_KEY, 'hex'));
    return secp.sign(msgHash, privateKeyBytes, { recovered: true });
}

// Call sign trasaction.
(async () => {
    const [signature, recoveryBit] = await signTransaction("032157ea24712dfda552bc2fbc8cfc83b0c09ed9c4aeb0f2215d817ae3e254c8", 10, "236449c24f93cf269544913514bd496f4b946a7cfb5eb3c1a3a6a81f3ed7bdab");
    console.log(`Signature: ${signature}`);
    console.log(`Recovery bit: ${recoveryBit}`);
})();