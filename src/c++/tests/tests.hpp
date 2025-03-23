#define CATCH_CONFIG_MAIN
#include <iostream>
#include <sstream>
#include "catch.hpp"
#include "../lib/styled-terminal.hpp" // Replace with the actual name of your header

using StyledTerminal::Color;
using StyledTerminal::InvalidParameter;
using StyledTerminal::Style;

TEST_CASE("Color Combinations")
{

    SECTION("should handle bright and dim colors correctly")
    {
        Color brightColor = Color::brightRed();
        Color dimColor = Color::hsl(0, 50, 25); // Assumes your C++ Color has a similar hsl function
        std::string styledText = Style().fg(brightColor).bg(dimColor).apply("Bright on Dim");
        REQUIRE(styledText == "\x1b[38;5;9m\x1b[48;2;96;32;32mBright on Dim\x1b[0m");
    }

    SECTION("should handle grayscale colors correctly")
    {
        Color grayColor = Color::table256(240); // Assumes your C++ Color has a similar table256 function
        std::string styledText = Style().fg(grayColor).apply("Grayscale Text");
        REQUIRE(styledText == "\x1b[38;5;240mGrayscale Text\x1b[0m");
    }

    SECTION("should handle hex colors with different cases correctly")
    {
        Color color1 = Color::hex("#ff0000");
        Color color2 = Color::hex("#FF0000");
        REQUIRE(color1.getCode() == color2.getCode());
    }
}

TEST_CASE("Error Handling")
{
    SECTION("should throw an error for invalid RGB values")
    {
        REQUIRE_THROWS_AS(Color::rgb(255, 0, 0), InvalidParameter);
    }

    SECTION("should throw an error for invalid hex codes")
    {
        REQUIRE_THROWS_AS(Color::hex("invalid"), InvalidParameter);
    }

    SECTION("should throw an error for invalid 256-color index")
    {
        REQUIRE_THROWS_AS(Color::table256(-1), InvalidParameter);
    }
}

std::string capture_cout(std::function<void()> func)
{
    std::stringstream buffer;
    std::streambuf *old_cout_buffer = std::cout.rdbuf(buffer.rdbuf());
    func();
    std::cout.rdbuf(old_cout_buffer); // Restore original cout buffer
    return buffer.str();
}

TEST_CASE("Integration Tests: Styled Terminal Output")
{

    SECTION("should output styled text to console.log with default style instance")
    {
        std::string output = capture_cout([&]()
                                          { std::cout << Style().bold().fg(Color::red()).apply("Styled Text"); });
        REQUIRE(output == "\x1b[1m\x1b[38;5;1mStyled Text\x1b[0m");
    }

    SECTION("should output styled text to console.log with custom style instance")
    {
        std::string output = capture_cout([&]()
                                          {
            Style customStyle = Style().underline().bg(Color::blue());
            std::cout << customStyle.apply("Another Styled Text"); });
        REQUIRE(output == "\x1b[4m\x1b[48;5;4mAnother Styled Text\x1b[0m");
    }

    SECTION("should handle complex style combinations and output correctly")
    {
        std::string output = capture_cout([&]()
                                          {
            Style complexStyle = Style().bold().italic().underline()
                .fg(Color::hex("#FF5733"))
                .bg(Color::hsl(240, 100, 50));
            std::cout << complexStyle.apply("Complex Style Test"); });

        std::string expectedColor = Color::hex("#FF5733").getCode();
        std::string expectedBgColor = Color::hsl(240, 100, 50).getCode();

        REQUIRE(output == "\x1b[1m\x1b[3m\x1b[4m\x1b[38;" + expectedColor + "m\x1b[48;" + expectedBgColor + "mComplex Style Test\x1b[0m");
    }

    SECTION("should handle reset styles correctly")
    {
        std::string output = capture_cout([&]()
                                          {
            Style resetStyle = Style().bold().fg(Color::green()).reset();
            std::cout << resetStyle.apply("Reset Text"); });
        REQUIRE(output == "Reset Text");
    }

    SECTION("should handle hidden and reveal styles correctly")
    {
        std::string output_hidden = capture_cout([&]()
                                                 { std::cout << Style().hidden().apply("Hidden Text"); });
        std::string output_revealed = capture_cout([&]()
                                                   { std::cout << Style().reveal().apply("Revealed Text"); });

        REQUIRE(output_hidden == "\x1b[8mHidden Text\x1b[0m");
        REQUIRE(output_revealed == "\x1b[28mRevealed Text\x1b[0m");
    }

    SECTION("should handle light, normal, strikethrough, and noStrikethrough styles")
    {
        std::string output_light = capture_cout([&]()
                                                { std::cout << Style().light().apply("Light Text"); });
        std::string output_normal = capture_cout([&]()
                                                 { std::cout << Style().normal().apply("Normal Text"); });
        std::string output_strikethrough = capture_cout([&]()
                                                        { std::cout << Style().strikethrough().apply("Strikethrough Text"); });
        std::string output_no_strikethrough = capture_cout([&]()
                                                           { std::cout << Style().noStrikethrough().apply("No Strikethrough Text"); });

        REQUIRE(output_light == "\x1b[2mLight Text\x1b[0m");
        REQUIRE(output_normal == "\x1b[22mNormal Text\x1b[0m");
        REQUIRE(output_strikethrough == "\x1b[9mStrikethrough Text\x1b[0m");
        REQUIRE(output_no_strikethrough == "\x1b[29mNo Strikethrough Text\x1b[0m");
    }

    SECTION("should handle resetFg and resetBg styles")
    {
        std::string output_reset_fg = capture_cout([&]()
                                                   { std::cout << Style().fg(Color::red()).resetFg().apply("Reset Foreground"); });
        std::string output_reset_bg = capture_cout([&]()
                                                   { std::cout << Style().bg(Color::blue()).resetBg().apply("Reset Background"); });

        REQUIRE(output_reset_fg == "\x1b[39mReset Foreground\x1b[0m");
        REQUIRE(output_reset_bg == "\x1b[49mReset Background\x1b[0m");
    }
}

TEST_CASE("Style Chaining and Reusability")
{
    SECTION("should chain styles correctly")
    {
        Style style = Style().bold().underline().fg(Color::blue());
        std::string styledText = style.apply("Chained Style");
        REQUIRE(styledText == "\x1b[1m\x1b[4m\x1b[38;5;4mChained Style\x1b[0m");
    }

    SECTION("should reuse a style instance")
    {
        Style reusableStyle = Style().italic().bg(Color::yellow());
        std::string text1 = reusableStyle.apply("Text 1");
        std::string text2 = reusableStyle.apply("Text 2");
        REQUIRE(text1 == "\x1b[3m\x1b[48;5;3mText 1\x1b[0m");
        REQUIRE(text2 == "\x1b[3m\x1b[48;5;3mText 2\x1b[0m");
    }

    SECTION("should create a new style from an existing style without affecting the original")
    {
        Style originalStyle = Style().bold();
        Style newStyle = Style(originalStyle).underline();
        REQUIRE(originalStyle.apply("Original") == "\x1b[1mOriginal\x1b[0m");
        REQUIRE(newStyle.apply("New") == "\x1b[1m\x1b[4mNew\x1b[0m");
    }
}

TEST_CASE("Style Modifiers and Long Text")
{

    SECTION("should apply multiple modifiers correctly")
    {
        std::string styledText = Style().bold().italic().underline().strikethrough().fg(Color::red()).bg(Color::blue()).apply("Multiple Modifiers");

        REQUIRE(styledText == "\x1b[1m\x1b[3m\x1b[4m\x1b[9m\x1b[38;5;1m\x1b[48;5;4mMultiple Modifiers\x1b[0m");
    }

    SECTION("should handle long text with styles correctly")
    {
        std::string longText =
            "This is a very long text with multiple styles applied to it. "
            "It should wrap around and still maintain the styles. "
            "This test ensures that styles are applied consistently "
            "even with large amounts of text.";

        std::string styledText = Style().bold().fg(Color::green()).apply(longText);

        REQUIRE(styledText == "\x1b[1m\x1b[38;5;2m" + longText + "\x1b[0m");
    }

    SECTION("should handle nested styles correctly")
    {
        std::string styledText = Style().bold().fg(Color::red()).apply("Bold Red " + Style().italic().fg(Color::blue()).apply("Italic Blue ") + "Bold Red again");
        std::string expectedRed = Color::red().getCode();
        std::string expectedBlue = Color::blue().getCode();
        REQUIRE(styledText == "\x1b[1m\x1b[38;" + expectedRed + "mBold Red \x1b[3m\x1b[38;" + expectedBlue + "mItalic Blue \x1b[0m\x1b[1m\x1b[38;" + expectedRed + "mBold Red again\x1b[0m");
    }

    SECTION("should handle reset modifiers correctly in long text")
    {
        std::string longText = "This is some styled text. ";
        std::string resetText = "This should be the same with no style applied.";
        std::string styledText = Style().bold().fg(Color::green()).apply(longText + Style().fg(Color::cyan()).reset().apply(resetText));

        REQUIRE(styledText == "\x1b[1m\x1b[38;5;2m" + longText + resetText + "\x1b[0m");
    }

    SECTION("should handle hidden and reveal in long texts")
    {
        std::string hiddenText = Style().hidden().apply("Hidden Part");
        std::string revealedText = Style().reveal().apply("Revealed Part");
        std::string longText =
            "Some visible text. " + hiddenText + " Some more visible text. " + revealedText;
        REQUIRE(longText == "Some visible text. \x1b[8mHidden Part\x1b[0m Some more visible text. \x1b[28mRevealed Part\x1b[0m");
    }

    SECTION("should handle multiple foreground and background changes")
    {
        std::string text =
            Style().fg(Color::red()).bg(Color::blue()).apply("Red on Blue ") +
            Style().fg(Color::yellow()).bg(Color::magenta()).apply("Yellow on Magenta");
        std::string expectedRed = Color::red().getCode();
        std::string expectedBlue = Color::blue().getCode();
        std::string expectedYellow = Color::yellow().getCode();
        std::string expectedMagenta = Color::magenta().getCode();
        REQUIRE(text == "\x1b[38;" + expectedRed + "m\x1b[48;" + expectedBlue + "mRed on Blue \x1b[0m\x1b[38;" + expectedYellow + "m\x1b[48;" + expectedMagenta + "mYellow on Magenta\x1b[0m");
    }
}

TEST_CASE("Randomness Test: Styled Terminal Output")
{
    const int TIMES = 500;

    SECTION("prints " + std::to_string(TIMES) + " random colors to check randomness.")
    {
        std::vector<std::string> colors;
        std::string text = "   ";

        for (int i = 0; i < TIMES; ++i)
        {
            std::string v = Style().bg(Color::random()).apply(text);
            colors.push_back(v);
            std::cout << v;
        }

        std::cout << std::endl;

        REQUIRE(colors.size() == TIMES);
    }
}
