#ifndef BLOCK_H
#define BLOCK_H

#include <iostream>
#include <string>
#include <chrono>

struct Block {
    std::string hash;
    std::string previousHash;
    std::string data;
    int nonce;
    int difficulty;
    long long timestamp;

    Block(std::string data, std::string previousHash, int difficulty);
};

#endif