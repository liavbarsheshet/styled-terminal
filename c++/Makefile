CXX = g++
CXXFLAGS = -std=c++14 -Wall -Wextra -pedantic -mconsole
BUILD_DIR = build
TEST_SRC = tests/tests.hpp
TEST_EXE = $(BUILD_DIR)/tests.exe

$(TEST_EXE): $(TEST_SRC) tests/catch.hpp lib/styled-terminal.hpp
	$(CXX) $(CXXFLAGS) $(TEST_SRC) -o $(TEST_EXE)

run: $(TEST_EXE)
	$(TEST_EXE)

clean:
	rm $(TEST_EXE)

all: version_check $(TEST_EXE) run