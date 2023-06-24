#ifndef BLOCKCHAIN_H
#define BLOCKCHAIN_H

#include <vector>
#include "block.h"

struct Blockchain {
    std::vector<Block> chain;
    int difficulty = 3;

    Blockchain(int difficulty);
    void addBlock(Block block);
    bool isChainValid();
    Block getLastBlock();
};

#endif