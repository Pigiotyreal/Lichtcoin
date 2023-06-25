#ifndef WALLET_H
#define WALLET_H

#include "transaction.h"

struct Wallet {
    std::string addr;
    double balance;

    Wallet(std::string address, double balance);
    void send(Wallet &receiver, double amount);
};

#endif