#include <gtest/gtest.h>
#include <string>
#include <regex>
#include "styled-terminal.hpp"

using namespace StyledTerminal;

// Utility function to remove ANSI escape codes for comparison
std::string stripAnsiCodes(const std::string &input)
{
    std::regex ansi_escape("\x1b\\[[0-9;]*m");
    return std::regex_replace(input, ansi_escape, "");
}

class StyledTerminalTest : public ::testing::Test
{
protected:
    Style style;
};

// Color Creation Tests
TEST_F(StyledTerminalTest, ColorCreation)
{
    // Test various color creation methods
    EXPECT_NO_THROW(Color::red());
    EXPECT_NO_THROW(Color::brightRed());
    EXPECT_NO_THROW(Color::hex("#FF0000"));
    EXPECT_NO_THROW(Color::rgb(255, 0, 0));
    EXPECT_NO_THROW(Color::hsl(0, 100, 50));
    EXPECT_NO_THROW(Color::table256(1));
    EXPECT_NO_THROW(Color::random());
}

// Color Hex Handling
TEST_F(StyledTerminalTest, HexColorHandling)
{
    Color color1 = Color::hex("#FF0000");
    Color color2 = Color::hex("FF0000");

    EXPECT_EQ(color1.getCode(), color2.getCode());

    // Test short hex code
    EXPECT_NO_THROW(Color::hex("#F00"));
}

// Color Error Handling
TEST_F(StyledTerminalTest, ColorErrorHandling)
{
    // Invalid RGB values
    EXPECT_THROW(Color::rgb(300, 0, 0), InvalidParameter);

    // Invalid HSL values
    EXPECT_THROW(Color::hsl(400, 0, 0), InvalidParameter);
    EXPECT_THROW(Color::hsl(0, 120, 0), InvalidParameter);

    // Invalid hex code
    EXPECT_THROW(Color::hex("invalid"), InvalidParameter);
}

// Style Chaining Tests
TEST_F(StyledTerminalTest, StyleChaining)
{
    Style complexStyle = style.bold().italic().underline().fg(Color::red()).bg(Color::blue());

    std::string styledText = complexStyle.apply("Chained Style Test");

    EXPECT_TRUE(styledText.find("\x1b[1m") != std::string::npos); // Bold
    EXPECT_TRUE(styledText.find("\x1b[3m") != std::string::npos); // Italic
    EXPECT_TRUE(styledText.find("\x1b[4m") != std::string::npos); // Underline
}

// Random Color Generation
TEST_F(StyledTerminalTest, RandomColorGeneration)
{
    Color randomColor1 = Color::random();
    Color randomColor2 = Color::random();

    // Ensure random colors are created (cannot compare specific values)
    EXPECT_NO_THROW(randomColor1);
    EXPECT_NO_THROW(randomColor2);

    // Ensure bright and dim random colors can be generated
    EXPECT_NO_THROW(Color::randomBright());
    EXPECT_NO_THROW(Color::randomDim());
}

// Style Modifiers
TEST_F(StyledTerminalTest, StyleModifiers)
{
    // Test various style modifiers
    EXPECT_NO_THROW(style.bold());
    EXPECT_NO_THROW(style.light());
    EXPECT_NO_THROW(style.italic());
    EXPECT_NO_THROW(style.underline());
    EXPECT_NO_THROW(style.strikethrough());
    EXPECT_NO_THROW(style.hidden());
    EXPECT_NO_THROW(style.reveal());
    EXPECT_NO_THROW(style.invert());
}

// Color Combinations
TEST_F(StyledTerminalTest, ColorCombinations)
{
    // Test foreground and background color combinations
    Style coloredStyle = style.fg(Color::brightRed()).bg(Color::hsl(0, 50, 25));
    std::string styledText = coloredStyle.apply("Color Combination Test");

    EXPECT_TRUE(styledText.find("\x1b[38;5;9m") != std::string::npos);
    EXPECT_TRUE(styledText.find("Color Combination Test") != std::string::npos);
}

// Nested Styles
TEST_F(StyledTerminalTest, NestedStyles)
{
    std::string nestedStyleText = style.bold()
                                      .fg(Color::red())
                                      .apply("Bold Red " +
                                             style.italic().fg(Color::blue()).apply("Italic Blue ") +
                                             "Bold Red again");

    EXPECT_TRUE(nestedStyleText.find("Bold Red") != std::string::npos);
    EXPECT_TRUE(nestedStyleText.find("Italic Blue") != std::string::npos);
}

// Style Reset
TEST_F(StyledTerminalTest, StyleReset)
{
    Style resetStyle = style.bold().reset();
    std::string resetText = resetStyle.apply("Reset Text");

    EXPECT_EQ(resetText, "Reset Text");
}

int main(int argc, char **argv)
{
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}