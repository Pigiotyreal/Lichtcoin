#include "blockchain.h"

Blockchain::Blockchain(int difficulty) {
    this->difficulty = difficulty;
    this->chain.push_back(Block(0, "Genesis Block", "0", difficulty));
}

void Blockchain::adjustDifficulty() {
    int number = 1;
    int blockTime = 3;

    if(this->chain.size() % number == 0) {
        long long timeDiff = this->chain[this->chain.size() - 1].timestamp - this->chain[this->chain.size() - 1 - number].timestamp;
        if(timeDiff < blockTime) {
            this->difficulty++;
        } else {
            this->difficulty--;
        }
    }
}

void Blockchain::minePendingTransactions() {
    adjustDifficulty();
    Block newBlock = Block(this->chain.size(), "Pending Block", this->getLastBlock().hash, this->difficulty);
    newBlock.mineBlock(this->difficulty);
    this->chain.push_back(newBlock);
}

void Blockchain::addBlock(Block block) {
    this->chain.push_back(block);
}

bool Blockchain::isChainValid() {
    for(int i = 1; i < this->chain.size(); i++) {
        Block currentBlock = this->chain[i];
        Block previousBlock = this->chain[i - 1];

        if(currentBlock.hash != calculateHash(currentBlock)) {
            return false;
        }

        if(currentBlock.previousHash != previousBlock.hash) {
            return false;
        }
    }

    return true;
}

Block Blockchain::getLastBlock() {
    return this->chain[this->chain.size() - 1];
}