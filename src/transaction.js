const crypto = require("crypto")

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

module.exports = Transaction