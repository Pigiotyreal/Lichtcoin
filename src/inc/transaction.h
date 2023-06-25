#ifndef TRANSACTION_H
#define TRANSACTION_H

#include <string>

struct Transaction {
    std::string senderAddr;
    std::string receiverAddr;
    double amount;
};

#endif