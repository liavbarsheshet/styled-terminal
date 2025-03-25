CXX = g++
CXXFLAGS = -std=c++17 -lgtest -lgtest_main -pthread
BUILD_DIR = build
TEST_SRC = tests/tests.cpp
TEST_EXE = $(BUILD_DIR)/tests

$(TEST_EXE): $(TEST_SRC)  lib/styled-terminal.hpp
	$(CXX) $(CXXFLAGS) $(TEST_SRC) -o $(TEST_EXE)

run: $(TEST_EXE)
	$(TEST_EXE)

clean:
	rm $(TEST_EXE)

all: version_check $(TEST_EXE) run