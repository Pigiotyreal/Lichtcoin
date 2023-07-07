const crypto = require("crypto")

class Block {
    constructor(index, prevHash, hash, data, timestamp, difficulty, nonce) {
        this.index = index
        this.prevHash = prevHash
        this.hash = hash
        this.data = data
        this.timestamp = timestamp
        this.difficulty = difficulty
        this.nonce = nonce
    }

    static get genesis() {
        const index = 0
        const prevHash = "0".repeat(64)
        const hash = crypto.createHash("sha256").update("Genesis Block").digest("hex")
        const data = "Genesis Block"
        const timestamp = 0
        const difficulty = 4
        const nonce = 0

        return new Block(index, prevHash, hash, data, timestamp, difficulty, nonce)
    }

    static mine(prevBlock, data) {
        const index = prevBlock.index + 1
        const prevHash = prevBlock.hash
        const timestamp = Date.now()
        const difficulty = Block.adjustDifficulty(prevBlock, timestamp)

        let nonce = 0
        let hash, leadingZeros = "0".repeat(prevBlock.difficulty)

        do {
            nonce++
            hash = crypto.createHash("sha256").update(index + prevHash + data + timestamp + nonce).digest("hex")
        } while (hash.startsWith(leadingZeros) == false)

        return new Block(index, prevHash, hash, data, timestamp, difficulty, nonce)
    }

    static isValid(block, prevBlock) {
        if (block.index != prevBlock.index + 1) {
            return false
        } else if (block.prevHash != prevBlock.hash) {
            return false
        } else if (block.hash != Block.computeHash(block)) {
            return false
        }

        return true
    }

    static computeHash(block) {
        return crypto.createHash("sha256").update(block.index + block.prevHash + block.data + block.timestamp + block.nonce).digest("hex")
    }

    static adjustDifficulty(prevBlock, timestamp) {
        const difficulty = prevBlock.difficulty

        if (timestamp - prevBlock.timestamp > 300) {
            if (difficulty > 3 || difficulty < 24) {
                return difficulty
            }

            return difficulty - 1
        } else if (difficulty < 5) {
            return difficulty + 1
        }

        return difficulty
    } 
}

class Blockchain {
    constructor() {
        this.blocks = [Block.genesis]
    }

    addBlock(data) {
        const prevBlock = this.blocks[this.blocks.length - 1]
        const block = Block.mine(prevBlock, data)
        this.blocks.push(block)
    }

    isValid() {
        for (let i = 1; i < this.blocks.length; i++) {
            const block = this.blocks[i]
            const prevBlock = this.blocks[i - 1]

            if (Block.isValid(block, prevBlock) == false) {
                return false
            }
        }

        return true
    }
}

class Transaction {
    constructor(from, to, amount) {
        this.from = from
        this.to = to
        this.amount = amount
    }

    static sign(transaction, privateKey) {
        transaction.signature = crypto.createSign("SHA256").update(transaction.from + transaction.to + transaction.amount).sign(privateKey, "hex")
    }

    static verify(transaction) {
        return crypto.createVerify("SHA256").update(transaction.from + transaction.to + transaction.amount).verify(transaction.from, transaction.signature, "hex")
    }

    static transfer(from, to, amount, privateKey) {
        const transaction = new Transaction(from, to, amount)
        Transaction.sign(transaction, privateKey)
        return transaction
    }

    static generateKeyPair() {
        return crypto.generateKeyPairSync("rsa", {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: "spki",
                format: "pem"
            },
            privateKeyEncoding: {
                type: "pkcs8",
                format: "pem"
            }
        })
    }

    static get publicKey() {
        return this.generateKeyPair().publicKey
    }

    static get privateKey() {
        return this.generateKeyPair().privateKey
    }

    static get wallet() {
        const keyPair = this.generateKeyPair()
        return {
            publicKey: keyPair.publicKey,
            privateKey: keyPair.privateKey
        }
    }

    static get balance() {
        return this.amount
    }
}

const genesisBlock = Block.genesis
console.log(genesisBlock)

const block = Block.mine(genesisBlock, "Hello World")
console.log(block)

const blockchain = new Blockchain()
blockchain.addBlock("Hello World")
blockchain.addBlock("Hello World")
blockchain.addBlock("Hello World")
console.log(blockchain)

console.log(blockchain.isValid())

const user1 = Transaction.wallet
const user2 = Transaction.wallet
const user3 = Transaction.wallet

user1.balance = 250
user2.balance = 0
user3.balance = 0

const transaction = Transaction.transfer(user1.publicKey, user2.publicKey, 50, user1.privateKey)
const transaction2 = Transaction.transfer(user2.publicKey, user3.publicKey, 25, user2.privateKey)
console.log(transaction)
console.log(transaction2)

console.log(Transaction.verify(transaction))
console.log(Transaction.verify(transaction2))

user1.balance -= transaction.amount
user2.balance += transaction.amount

user2.balance -= transaction2.amount
user3.balance += transaction2.amount

console.log(user1.balance)
console.log(user2.balance)
console.log(user3.balance)