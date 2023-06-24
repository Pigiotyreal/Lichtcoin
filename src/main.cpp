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

    for (int i = 0; i < blockchain.chain.size(); i++) {
        std::cout << "Block " << i << " data: " << blockchain.chain[i].data << std::endl;
        std::cout << "Block " << i << " hash: " << blockchain.chain[i].hash << std::endl;
        std::cout << "Block " << i << " previous hash: " << blockchain.chain[i].previousHash << std::endl;
        std::cout << "Block " << i << " nonce: " << blockchain.chain[i].nonce << std::endl;
        std::cout << "Block " << i << " difficulty: " << blockchain.chain[i].difficulty << std::endl;
        std::cout << "Block " << i << " timestamp: " << blockchain.chain[i].timestamp << std::endl;
    }

    return 0;
}