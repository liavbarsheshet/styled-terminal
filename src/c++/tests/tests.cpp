#include "../lib/styled-terminal.hpp"

#include <iostream>

using StyledTerminal::Color;
using StyledTerminal::InvalidParameter;
using StyledTerminal::Style;

int main()
{
    std::cout << Style().bg(Color::red()).apply("Hello World!") << std::endl;
    std::cin.get();
    return 0;
}