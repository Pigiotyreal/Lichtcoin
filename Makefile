CC = g++
CFLAGS = -Wall -g
LDFLAGS = -lssl -lcrypto
EXEC = bin/lichtcoin.exe
INCPATH = -Isrc/inc
LIBPATH = -Lsrc/lib
SRC = $(wildcard src/*.cpp)

all: $(EXEC)

$(EXEC): $(SRC)
	$(CC) $(CFLAGS) $(INCPATH) $(LIBPATH) $^ -o $@ $(LDFLAGS)
	./$(EXEC)

clean:
	rm -f $(OBJ) $(EXEC)