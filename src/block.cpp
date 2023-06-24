#include "inc/block.h"

Block::Block(std::string data, std::string previousHash, int difficulty) {
    this->data = data;
    this->previousHash = previousHash;
    this->difficulty = difficulty;
    this->nonce = 0;
    this->timestamp = std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count();
    this->hash = "ahash";
}

int main() {
    Block block("data", "previousHash", 0);
    std::cout << block.hash << std::endl;
    return 0;
}