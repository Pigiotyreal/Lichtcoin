#include "inc/block.h"

std::string calculateHash(Block block) {
    std::string data = block.data;
    std::string previousHash = block.previousHash;
    int nonce = block.nonce;
    int difficulty = block.difficulty;
    long long timestamp = block.timestamp;

    std::string input = data + previousHash + std::to_string(nonce) + std::to_string(difficulty) + std::to_string(timestamp);

    unsigned char hash[SHA256_DIGEST_LENGTH];
    SHA256_CTX sha256;
    SHA256_Init(&sha256);
    SHA256_Update(&sha256, input.c_str(), input.length());
    SHA256_Final(hash, &sha256);

    std::stringstream ss;
    for(int i = 0; i < SHA256_DIGEST_LENGTH; i++) {
        ss << std::hex << std::setw(2) << std::setfill('0') << (int)hash[i];
    }

    return ss.str();
}

Block::Block(std::string data, std::string previousHash, int difficulty) {
    this->data = data;
    this->previousHash = previousHash;
    this->difficulty = difficulty;
    this->nonce = 0;
    this->timestamp = std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count();
    this->hash = calculateHash(*this);

    std::cout << "Block created!" << std::endl;
}

int main() {
    Block block("data", "previousHash", 0);
    std::cout << block.hash << std::endl;
    return 0;
}