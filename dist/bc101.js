"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
class Block {
    constructor(index, previousHash, timestamp, data) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
    }
    calculateHash() {
        const data = this.index + this.previousHash + this.timestamp + this.data;
        return crypto
            .createHash('sha256')
            .update(data)
            .digest('hex');
    }
}
;
class Blockchain {
    get latestBlock() {
        return this.chain[this.chain.length - 1];
    }
    constructor() {
        this.chain = [];
        // Create the genesis block.
        this.chain.push(new Block(0, '0', Date.now(), 'Genesis block'));
    }
    addBlock(data) {
        const block = new Block(this.latestBlock.index + 1, this.latestBlock.hash, Date.now(), data);
        this.chain.push(block);
    }
}
console.log('Creating the blockchain with the genesis block...');
const blockchain = new Blockchain();
console.log('Mining block #1...');
blockchain.addBlock('First block');
console.log('Mining block #2...');
blockchain.addBlock('Second block');
console.log(JSON.stringify(blockchain, null, 2));
