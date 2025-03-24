/**
 * Styled Terminal
 * @version 2.0.0
 *
 * @brief A fast, robust and lightweight terminal string styling library.
 *
 * @author Liav Barsheshet <LBDevelopments> © 2025
 */
#include <exception>
#include <cstdint>
#include <random>
#include <string>
#include <vector>
#include <array>
#include <cmath>
#include <regex>
#include <iostream>

#ifndef _STYLED_TERMINAL_HPP
#define _STYLED_TERMINAL_HPP

// [Module Exports]

namespace StyledTerminal
{

    // [Exception Section]

    /**
     * Base error class for styled-terminal.
     */
    class STException : public std::exception
    {
    private:
        // The error message.
        std::string message;

    public:
        /**
         * @brief  Constructs an styled-terminal exception with the given message.
         *
         * @param msg The error message.
         */
        STException(const char *msg) : message(msg ? msg : "Oops something went wrong!") {}

        // Overrides the what() method.
        const char *what() const throw()
        {
            return ("[styled-terminal] " + this->message).c_str();
        }
    };

    /**
     * Represents an error for invalid parameters.
     */
    class InvalidParameter : public STException
    {
    public:
        /**
         * @brief  Constructs an invalid param exception.
         *
         * @param param The invalid parameter name.
         * @param legal The expected valid format or value.
         */
        InvalidParameter(const std::string &param, const std::string &legal) : STException(("The parameter '" + param + "' is invalid. It should be " + legal + ".").c_str()) {}
    };

    // [Util Section]

    /**
     * @brief Generates a random seed.
     *
     * @return A uint32 random seed.
     */
    uint32_t generateRandomSeed()
    {
        std::random_device rd;
        std::mt19937 gen(rd());
        std::uniform_int_distribution<uint32_t> dis(0, 0xFFFFFFFF);

        return dis(gen);
    }

    // Internal seed for the XORShift32 algorithm.
    uint32_t random_seed = generateRandomSeed();

    /**
     * @brief Generates a 32-bit unsigned pseudo-random integer using the XORShift32 algorithm.
     *
     * @return  A 32-bit unsigned pseudo-random integer.
     */
    uint32_t randXorShift32()
    {
        random_seed ^= random_seed << 13;
        random_seed ^= random_seed >> 17;
        random_seed ^= random_seed << 5;
        return random_seed;
    }

    /**
     * @brief Generates a pseudo-random integer within a specified inclusive range.
     *
     *
     * @param min The minimum value of the range (inclusive).
     * @param max The maximum value of the range (inclusive).
     * @return  A pseudo-random integer within the specified range.
     */
    uint32_t rand(uint32_t min, uint32_t max)
    {
        if (min > max)
            throw new InvalidParameter("min, max", "min <= max");

        if (max == min)
            return min;

        return randXorShift32() % (max - min + 1);
    }

    /**
     * @brief Util function for split strings with a given delimiter.
     *
     * @param str String to be splitted.
     * @param del The delimiter.
     * @return A vector of splitted strings by a given delimiter.
     */
    std::vector<std::string> split(std::string str, const std::string &del)
    {
        std::vector<std::string> result;

        auto pos = str.find(del);

        while (pos != std::string::npos)
        {
            result.push_back(str.substr(0, pos));

            str.erase(0, pos + del.length());

            pos = str.find(del);
        }

        if (str.length())
            result.push_back(str);

        return result;
    }

    // [Color Section]

    /**
     * Represents a Color.
     */
    class Color
    {
    private:
        /** A partial ansi color escape sequence. */
        std::string code;

    public:
        /**
         * @brief  Construct a new Color instance.
         *
         * @param code A partial ANSI code representing a color.
         */
        Color(std::string code)
        {
            std::regex re("^(?:(?:5;(?:(?:\\d)|(?:[1-9]\\d)|(?:1\\d\\d)|(?:2[0-4]\\d)|(?:25[0-5])))|(?:2;(?:(?:\\d)|(?:[1-9]\\d)|(?:1\\d\\d)|(?:2[0-4]\\d)|(?:25[0-5]));(?:(?:\\d)|(?:[1-9]\\d)|(?:1\\d\\d)|(?:2[0-4]\\d)|(?:25[0-5]));(?:(?:\\d)|(?:[1-9]\\d)|(?:1\\d\\d)|(?:2[0-4]\\d)|(?:25[0-5]))))$");

            if (!std::regex_search(code, re))
                throw new InvalidParameter("code", "in the format '5;[0-255]' or 2;[red];[green];[blue]");

            this->code = code;
        }

        /**
         * @brief  Choose an index from the 256-color lookup table.
         * @param index A number between 0-255 which represent a cell index
         *              0-7:  black..white,
         *              8-15: brightBlack...brightWhite
         *              16-231:  6 × 6 × 6 cube (216 colors): 16 + 36 × r + 6 × g + b (0 ≤ r, g, b ≤ 5).
         *              235-255: grayscale from dark to light in 24 steps.
         * @return A new Color instance corresponding to the provided index color.
         */
        static Color table256(const uint8_t &index)
        {
            return Color(std::string("5;") + std::to_string(static_cast<int>(index)));
        }

        /**
         * @brief  Creates a `Color` object from RGB (Red, Green, Blue) values.
         *
         * @param red The red component of the color, typically a value between 0 and 255.
         * @param green The green component of the color, typically a value between 0 and 255.
         * @param blue The blue component of the color, typically a value between 0 and 255.
         * @return A new Color instance corresponding to the provided RGB values.
         */
        static Color rgb(const uint8_t &red, const uint8_t &green, const uint8_t &blue)
        {
            return Color(
                std::string("2;") +
                std::to_string(static_cast<int>(red)) + ";" +
                std::to_string(static_cast<int>(green)) + ";" +
                std::to_string(static_cast<int>(blue)));
        }

        /**
         * @brief  Creates a `Color` object from HSL (Hue, Saturation, Lightness) values.
         *
         * @param hue The hue of the color, typically a value between 0 and 360 degrees.
         * @param saturation The saturation of the color, typically a percentage value between 0 and 100.
         * @param lightness The lightness of the color, typically a percentage value between 0 and 100.
         * @return A new Color instance corresponding to the provided HSL values.
         */
        static Color hsl(unsigned short hue, unsigned short saturation, unsigned short lightness)
        {
            if (hue > 360)
                throw new InvalidParameter("hue", "a number between 0-360");
            if (saturation > 100)
                throw new InvalidParameter("saturation", "a number between 0-100");
            if (lightness > 100)
                throw new InvalidParameter("lightness", "a number between 0-100");

            const double s = saturation / 100.0;
            const double l = lightness / 100.0;

            const double c = (1 - std::fabs(2 * l - 1)) * s;
            const double x = c * (1 - std::fabs((fmod(hue / 60, 2)) - 1));
            const double m = l - c / 2;

            double r, g, b;

            if (hue < 60)
            {
                r = c;
                g = x;
                b = 0;
            }
            else if (hue < 120)
            {
                r = x;
                g = c;
                b = 0;
            }
            else if (hue < 180)
            {
                r = 0;
                g = c;
                b = x;
            }
            else if (hue < 240)
            {
                r = 0;
                g = x;
                b = c;
            }
            else if (hue < 300)
            {
                r = x;
                g = 0;
                b = c;
            }
            else
            {
                r = c;
                g = 0;
                b = x;
            }

            return Color::rgb(
                round((r + m) * 255),
                round((g + m) * 255),
                round((b + m) * 255));
        }

        /**
         * @brief  Creates a `Color` instance from a hexadecimal color code.
         *
         * @param hexCode A string representing the color in hexadecimal format (e.g., `#FF5733` or `FF5733`).
         * @returns A new Color instance corresponding to the provided hex code.
         */
        static Color hex(const std::string &hexCode)
        {
            std::regex hexRegex("^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$");

            if (!std::regex_match(hexCode, hexRegex))
                throw new InvalidParameter("hexCode", "a valid hex color code.");

            std::string cleanedHex = hexCode;

            cleanedHex.erase(0, cleanedHex.find_first_not_of("#"));

            if (cleanedHex.length() == 3)
            {
                std::string expandedHex;
                for (char c : cleanedHex)
                {
                    expandedHex += c;
                    expandedHex += c;
                }
                cleanedHex = expandedHex;
            }

            uint8_t r = static_cast<uint8_t>(std::stoi(cleanedHex.substr(0, 2), nullptr, 16));
            uint8_t g = static_cast<uint8_t>(std::stoi(cleanedHex.substr(2, 2), nullptr, 16));
            uint8_t b = static_cast<uint8_t>(std::stoi(cleanedHex.substr(4, 2), nullptr, 16));

            return Color::rgb(r, g, b);
        }

        // [Default Colors]

        /**
         * @brief  @brief Styles the default black color.
         *
         * @return A new Color instance representing the default black color.
         */
        static Color black()
        {
            return Color::table256(0);
        }

        /**
         * @brief  @brief Styles the default bright black color.
         *
         * @return A new Color instance representing the default bright black color.
         */
        static Color brightBlack()
        {
            return Color::table256(8);
        }

        /**
         * @brief  @brief Styles the default red color.
         *
         * @return A new Color instance representing the default red color.
         */
        static Color red()
        {
            return Color::table256(1);
        }

        /**
         * @brief  @brief Styles the default bright red color.
         *
         * @return A new Color instance representing the default bright red color.
         */
        static Color brightRed()
        {
            return Color::table256(9);
        }

        /**
         * @brief  @brief Styles the default green color.
         *
         * @return A new Color instance representing the default green color.
         */
        static Color green()
        {
            return Color::table256(2);
        }

        /**
         * @brief  Styles the default bright green color.
         *
         * @return A new Color instance representing the default bright green color.
         */
        static Color brightGreen()
        {
            return Color::table256(10);
        }

        /**
         * @brief  Styles the default yellow color.
         *
         * @return A new Color instance representing the default yellow color.
         */
        static Color yellow()
        {
            return Color::table256(3);
        }

        /**
         * @brief  Styles the default bright yellow color.
         *
         * @return A new Color instance representing the default bright yellow color.
         */
        static Color brightYellow()
        {
            return Color::table256(11);
        }

        /**
         * @brief  Styles the default blue color.
         *
         * @return A new Color instance representing the default blue color.
         */
        static Color blue()
        {
            return Color::table256(4);
        }

        /**
         * @brief  Styles the default bright blue color.
         *
         * @return A new Color instance representing the default bright blue color.
         */
        static Color brightBlue()
        {
            return Color::table256(12);
        }

        /**
         * @brief  Styles the default magenta color.
         *
         * @return A new Color instance representing the default magenta color.
         */
        static Color magenta()
        {
            return Color::table256(5);
        }

        /**
         * @brief  Styles the default bright magenta color.
         *
         * @return A new Color instance representing the default bright magenta color.
         */
        static Color brightMagenta()
        {
            return Color::table256(13);
        }

        /**
         * @brief  Styles the default cyan color.
         *
         * @return A new Color instance representing the default cyan color.
         */
        static Color cyan()
        {
            return Color::table256(6);
        }

        /**
         * @brief  Styles the default bright cyan color.
         *
         * @return A new Color instance representing the default bright cyan color.
         */
        static Color brightCyan()
        {
            return Color::table256(14);
        }

        /**
         * @brief  Styles the default white color.
         *
         * @return A new Color instance representing the default white color.
         */
        static Color white()
        {
            return Color::table256(7);
        }

        /**
         * @brief  Styles the default bright white color.
         *
         * @return A new Color instance representing the default bright white color.
         */
        static Color brightWhite()
        {
            return Color::table256(15);
        }

        /**
         * @brief  Styles a random color.
         *
         * @return A new Color instance representing the random color.
         */
        static Color random()
        {
            return Color::rgb(rand(0, 255), rand(0, 255), rand(0, 255));
        }

        /**
         * @brief  Styles a random bright color.
         *
         * @return A partial ANSI code representing the random bright color.
         */
        static Color randomBright()
        {
            return Color::hsl(rand(0, 360), 100, rand(50, 85));
        }

        /**
         * @brief  Styles a random dim color.
         *
         * @return A new Color instance representing the random dim color.
         */
        static Color randomDim()
        {
            return Color::hsl(rand(0, 360), 50, rand(15, 50));
        }

        /**
         * @brief  Styles the partial ansi color escape sequence.
         *
         * @return A partial ANSI code representing a color.
         */
        std::string getCode() const
        {
            return this->code;
        }
    };

    // [Style Section]

    /**
     * Represents the modifiers and their location.
     */
    enum EModifiers
    {
        /** Represents font weight modifier (Bold, Light and Normal) */
        FontWeight,
        /** Represent italic modifier.*/
        Italic,
        /** Represent underline decoration modifier.*/
        Underline,
        /** Represent strikethrough decoration modifier. */
        Strikethrough,
        /** Represent foreground color modifier. */
        ForegroundColor,
        /** Represent background color modifier. */
        BackgroundColor,
        /** Represent invert mode modifier. */
        Invert,
        /** Represent visibility mode modifier. */
        Visibility,
    };

    const std::string END_SEQUENCE = "\x1b[0m";

    /**
     * Represents a style used for terminal text.
     */
    class Style
    {
    private:
        std::array<std::string, 8> chain;

        std::string joinChain() const
        {
            std::string result = "";

            for (const auto &str : chain)
            {
                result += str;
            }

            return result;
        }

        Style applyModifier(const Style &style, const EModifiers &modifier, const std::string &code = "") const
        {
            Style new_style = Style(style);
            new_style.chain[modifier] = code;
            return new_style;
        }

    public:
        Style() : chain() {}

        Style(const Style &style) : chain(style.chain) {}

        /**
         * @brief  Resets all the current style modifiers.
         *
         * @return A new `Style` instance for fluent method chaining.
         */
        Style reset() const
        {
            return Style();
        }

        /**
         * @brief  Hides the text.
         *
         * @return A new `Style` instance for fluent method chaining.
         */
        Style hidden() const
        {
            return this->applyModifier(*this, EModifiers::Visibility, "\x1b[8m");
        }

        /**
         * @brief Force revealing a hidden text.
         *
         * @return A new `Style` instance for fluent method chaining.
         */
        Style reveal() const
        {
            return this->applyModifier(*this, EModifiers::Visibility, "\x1b[28m");
        }

        /**
         * @brief Mode that swaps foreground and background colors.
         *
         * @return A new `Style` instance for fluent method chaining.
         */
        Style invert() const
        {
            return this->applyModifier(*this, EModifiers::Invert, "\x1b[7m");
        }

        /**
         * @brief Force disable the mode that swaps foreground and background colors.
         *
         * @return A new `Style` instance for fluent method chaining.
         */
        Style noInvert() const
        {
            return this->applyModifier(*this, EModifiers::Invert, "\x1b[27m");
        }

        /**
         * @brief Sets the mode that swaps foreground and background colors to auto.
         *
         * @return A new `Style` instance for fluent method chaining.
         */
        Style autoInvert() const
        {
            return this->applyModifier(*this, EModifiers::Invert);
        }

        /**
         * @brief Sets visibility to be auto.
         *
         * @return A new `Style` instance for fluent method chaining.
         */
        Style autoVisibility() const
        {
            return this->applyModifier(*this, EModifiers::Visibility);
        }

        /**
         * @brief Sets the font weight of the text to bold.
         *
         * @return A new `Style` instance for fluent method chaining.
         */
        Style bold() const
        {
            return this->applyModifier(*this, EModifiers::FontWeight, "\x1b[1m");
        }

        /**
         * @brief Sets the font weight of the text to light.
         *
         * @return A new `Style` instance for fluent method chaining.
         */
        Style light() const
        {
            return this->applyModifier(*this, EModifiers::FontWeight, "\x1b[2m");
        }

        /**
         * @brief Sets the font weight of the text to normal.
         *
         * @return A new `Style` instance for fluent method chaining.
         */
        Style normal() const
        {
            return this->applyModifier(*this, EModifiers::FontWeight, "\x1b[22m");
        }

        /**
         * @brief Sets the font weight of the text to auto.
         *
         * @return A new `Style` instance for fluent method chaining.
         */
        Style autoFontWeight() const
        {
            return this->applyModifier(*this, EModifiers::FontWeight);
        }

        /**
         * @brief Applies italic styling to the text.
         *
         * @return A new `Style` instance for fluent method chaining.
         */
        Style italic() const
        {
            return this->applyModifier(*this, EModifiers::Italic, "\x1b[3m");
        }

        /**
         * @brief Force remove italic styling from the text.
         *
         * @return A new `Style` instance for fluent method chaining.
         */
        Style noItalic() const
        {
            return this->applyModifier(*this, EModifiers::Italic, "\x1b[3m");
        }

        /**
         * @brief Sets italic styling of the text to auto.
         *
         * @return A new `Style` instance for fluent method chaining.
         */
        Style autoItalic() const
        {
            return this->applyModifier(*this, EModifiers::Italic);
        }

        /**
         * @brief Applies underline styling to the text.
         *
         * @return A new `Style` instance for fluent method chaining.
         */
        Style underline() const
        {
            return this->applyModifier(*this, EModifiers::Underline, "\x1b[4m");
        }

        /**
         * @brief Force remove any underline styling from the text.
         *
         * @return A new `Style` instance for fluent method chaining.
         */
        Style noUnderline() const
        {
            return this->applyModifier(*this, EModifiers::Underline, "\x1b[24m");
        }

        /**
         * @brief Sets any underline styling from the text to auto.
         *
         * @return A new `Style` instance for fluent method chaining.
         */
        Style autoUnderline() const
        {
            return this->applyModifier(*this, EModifiers::Underline, "\x1b[24m");
        }

        /**
         * @brief Applies strikethrough styling to the text.
         *
         * @return A new `Style` instance for fluent method chaining.
         */
        Style strikethrough() const
        {
            return this->applyModifier(*this, EModifiers::Strikethrough, "\x1b[9m");
        }

        /**
         * @brief Force remove any strikethrough styling from the text.
         *
         * @return A new `Style` instance for fluent method chaining.
         */
        Style noStrikethrough() const
        {
            return this->applyModifier(*this, EModifiers::Strikethrough, "\x1b[29m");
        }

        // [Color Methods]

        /**
         * @brief Force resetting the foreground color to the terminal default value.
         *
         * @return A new `Style` instance for fluent method chaining.
         */
        Style resetFg() const
        {
            return this->applyModifier(*this, EModifiers::ForegroundColor, "\x1b[39m");
        }

        /**
         * @brief Setting the foreground color to auto.
         *
         * @return A new `Style` instance for fluent method chaining.
         */
        Style autoFg() const
        {
            return this->applyModifier(*this, EModifiers::ForegroundColor);
        }

        /**
         * @brief Sets the foreground color of the text.
         *
         * @param color A Color instance representing a color.
         * @return A new `Style` instance for fluent method chaining.
         */
        Style fg(const Color &color) const
        {
            return this->applyModifier(*this, EModifiers::ForegroundColor, std::string("\x1b[38;") + color.getCode() + "m");
        }

        /**
         * @brief Force resetting the background color to the terminal default value.
         *
         * @return A new `Style` instance for fluent method chaining.
         */
        Style resetBg() const
        {
            return this->applyModifier(*this, EModifiers::BackgroundColor, "\x1b[49m");
        }

        /**
         * @brief Setting the background color to be auto.
         *
         * @return A new `Style` instance for fluent method chaining.
         */
        Style autoBg() const
        {
            return this->applyModifier(*this, EModifiers::BackgroundColor);
        }

        /**
         * @brief Sets the background color of the text.
         *
         * @param color A Color instance representing a color.
         * @returns {StyleObject} A new `Style` instance for fluent method chaining.
         */
        Style bg(const Color &color) const
        {
            return this->applyModifier(*this, EModifiers::BackgroundColor, std::string("\x1b[48;") + color.getCode() + "m");
        }

        // [Style Application]

        /**
         * @brief Applies a style to a string by concatenating it with additional strings.
         *
         * @param str The base string to apply the style to.
         * @param args Additional strings to concatenate (by " ").
         * @return The styled and concatenated string.
         */
        std::string apply(const std::string &str, const std::vector<std::string> &args = {})
        {
            std::string new_str = str;

            for (const auto &arg : args)
            {
                new_str += " " + arg;
            }

            std::string chain = this->joinChain();

            if (!chain.length() || !new_str.length())
                return str;

            // Nested styles logic.
            auto segments = split(new_str, END_SEQUENCE);

            std::string result = "";

            for (auto it = segments.begin(); it != segments.end(); ++it)
            {
                result += chain + (*it) + END_SEQUENCE;
            }

            return result;
        }
    };

}
#endif