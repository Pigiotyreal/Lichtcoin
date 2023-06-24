#include <iostream>
#include <string>
#include "blockchain.h"

int main() {    
    Blockchain blockchain = Blockchain(5);

    std::cout << "Mining block 1..." << std::endl;
    blockchain.minePendingTransactions();

    std::cout << "Mining block 2..." << std::endl;
    blockchain.minePendingTransactions();

    std::cout << "Mining block 3..." << std::endl;
    blockchain.minePendingTransactions();

    for (int i = 0; i < blockchain.chain.size(); i++) {
        std::cout << "Block " << i << " hash: " << blockchain.chain[i].hash << std::endl;
        std::cout << "Block " << i << " previous hash: " << blockchain.chain[i].previousHash << std::endl;
        std::cout << "Block " << i << " data: " << blockchain.chain[i].data << std::endl;
        std::cout << "Block " << i << " nonce: " << blockchain.chain[i].nonce << std::endl;
        std::cout << "Block " << i << " difficulty: " << blockchain.chain[i].difficulty << std::endl << std::endl;
    }

    return 0;
}