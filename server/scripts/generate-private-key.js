const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.utils.randomPrivateKey();
const publicKey = secp.getPublicKey(privateKey);

console.log(`Private key: ${toHex(privateKey)}`);
console.log(`Public key: ${toHex(publicKey)}`);
console.log(`Ethereum address: ${toHex(getAddressFromPublicKey(publicKey))}`);

function getAddressFromPublicKey(publicKeyBytes) {
    //The first byte indicates whether this is a compressed form or not. And we take the last 20 bytes for the address.
    return keccak256(publicKeyBytes.slice(1).slice(-20));
}
