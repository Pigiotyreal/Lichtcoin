#ifndef BLOCK_H
#define BLOCK_H

#include <iostream>
#include <string>
#include <chrono>
#include <iomanip>
#include <sstream>
#include <random>
#include "openssl/sha.h"

struct Block {
    int index;
    std::string hash;
    std::string previousHash;
    std::string data;
    int nonce;
    int difficulty;
    long long timestamp;

    Block(int index, std::string data, std::string previousHash, int difficulty);
    void mineBlock(int difficulty);
};

std::string calculateHash(Block block);
int generateNonce(Block block);

#endif