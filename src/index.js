const Block = require("./block")
const Blockchain = require("./blockchain")
const Transaction = require("./transaction")

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