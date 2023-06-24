#include <iostream>
#include <string>
#include "blockchain.h"

int main() {    
    Blockchain blockchain = Blockchain(5);

    blockchain.addBlock(Block(1, "Block 1", blockchain.getLastBlock().hash, blockchain.difficulty));
    blockchain.addBlock(Block(2, "Block 2", blockchain.getLastBlock().hash, blockchain.difficulty));
    blockchain.addBlock(Block(3, "Block 3", blockchain.getLastBlock().hash, blockchain.difficulty));
    blockchain.addBlock(Block(4, "Block 4", blockchain.getLastBlock().hash, blockchain.difficulty));
    blockchain.addBlock(Block(5, "Block 5", blockchain.getLastBlock().hash, blockchain.difficulty));

    std::cout << "Is blockchain valid? " << blockchain.isChainValid() << std::endl;

    blockchain.chain[2].data = "Block 1000";

    std::cout << "Is blockchain valid? " << blockchain.isChainValid() << std::endl;

    return 0;
}