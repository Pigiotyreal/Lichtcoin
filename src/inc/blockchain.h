#ifndef BLOCKCHAIN_H
#define BLOCKCHAIN_H

#include <vector>
#include "block.h"

struct Blockchain {
    std::vector<Block> chain;
    int difficulty;

    Blockchain(int difficulty);
    void addBlock(Block block);
    bool isChainValid();
    Block getLastBlock();
    void minePendingTransactions();
    void adjustDifficulty();
};

#endif