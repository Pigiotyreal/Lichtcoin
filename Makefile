CC = g++
CFLAGS = -Wall -g
LDFLAGS = 
EXEC = bin/lichtcoin.exe
SRC = $(wildcard src/*.cpp)

all: $(EXEC)

$(EXEC): $(SRC)
	$(CC) $(CFLAGS) -o $@ $^ $(LDFLAGS)
	./$(EXEC)

clean:
	rm -f $(OBJ) $(EXEC)