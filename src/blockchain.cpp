#include "blockchain.h"

Blockchain::Blockchain(int difficulty) {
    this->difficulty = difficulty;
    this->chain.push_back(Block(0, "Genesis Block", "0", difficulty));
}

void Blockchain::minePendingTransactions() {
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