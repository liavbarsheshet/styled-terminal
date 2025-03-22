/**
 * Styled Terminal [TODO: Add Description]
 * @version 2.0.0
 *
 * @brief Implementation of a  [TODO: Add Description].
 *
 * @author Liav Barsheshet <LBDevelopments> © 2025
 */

#include <exception>
#include <cstdint>
#include <string>
#include <cmath>
#include <regex>

#ifndef _STYLED_TERMINAL_HPP
#define _STYLED_TERMINAL_HPP

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
     * @brief Constructs an styled-terminal exception with the given message.
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
     * @brief Constructs an invalid param exception.
     *
     * @param param The invalid parameter name.
     * @param legal The expected valid format or value.
     */
    InvalidParameter(const std::string &param, const std::string &legal) : STException(("The parameter '" + param + "' is invalid. It should be " + legal + ".").c_str()) {}
};

// [Util Section]

// Internal seed for the XORShift32 algorithm.
uint32_t random_seed = 53899;

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
    if (min > max || max < 0 || min < 0)
        throw new InvalidParameter("min, max", "min <= max");

    if (max == min)
        return min;

    return randXorShift32() % (max - min + 1);
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
     * @brief Construct a new Color instance.
     *
     * @param code A partial ANSI code representing a color.
     */
    Color(std::string code)
    {
        std::regex re("^(?:(?:5;(?:(?:\d)|(?:[1-9]\d)|(?:1\d\d)|(?:2[0-4]\d)|(?:25[0-5])))|(?:2;(?:(?:\d)|(?:[1-9]\d)|(?:1\d\d)|(?:2[0-4]\d)|(?:25[0-5]));(?:(?:\d)|(?:[1-9]\d)|(?:1\d\d)|(?:2[0-4]\d)|(?:25[0-5]));(?:(?:\d)|(?:[1-9]\d)|(?:1\d\d)|(?:2[0-4]\d)|(?:25[0-5]))))$");

        if (!std::regex_search(code, re))
            throw new InvalidParameter("code", "in the format '5;[0-255]' or 2;[red];[green];[blue]");

        this->code = code;
    }

    /**
     * @brief Choose an index from the 256-color lookup table.
     * @param index A number between 0-255 which represent a cell index
     *              0-7:  black..white,
     *              8-15: brightBlack...brightWhite
     *              16-231:  6 × 6 × 6 cube (216 colors): 16 + 36 × r + 6 × g + b (0 ≤ r, g, b ≤ 5).
     *              235-255: grayscale from dark to light in 24 steps.
     * @return A new Color instance corresponding to the provided index color.
     */
    static Color table256(const uint8_t &index)
    {
        if (index > 255 || index < 0)
            throw new InvalidParameter("index", "a number between 0-255");

        return Color(std::string("5;") + std::to_string(static_cast<int>(index)));
    }

    /**
     * @brief Creates a `Color` object from RGB (Red, Green, Blue) values.
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
     * @brief Creates a `Color` object from HSL (Hue, Saturation, Lightness) values.
     *
     * @param hue The hue of the color, typically a value between 0 and 360 degrees.
     * @param saturation The saturation of the color, typically a percentage value between 0 and 100.
     * @param lightness The lightness of the color, typically a percentage value between 0 and 100.
     * @return A new Color instance corresponding to the provided HSL values.
     */
    static Color hsl(unsigned short hue, unsigned short saturation, unsigned short lightness)
    {
        if (hue > 360 || hue < 0)
            throw new InvalidParameter("hue", "a number between 0-360");
        if (saturation > 100 || saturation < 0)
            throw new InvalidParameter("saturation", "a number between 0-100");
        if (lightness > 100 || lightness < 0)
            throw new InvalidParameter("lightness", "a number between 0-100");

        const float s = saturation / 100;
        const float l = lightness / 100;

        const float c = (1 - abs(2 * l - 1)) * s;
        const float x = c * (1 - abs(((hue / 60) % 2) - 1));
        const float m = l - c / 2;

        float r, g, b;

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
     * @brief Creates a `Color` instance from a hexadecimal color code.
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
     * @brief @brief Gets the default black color.
     *
     * @return A new Color instance representing the default black color.
     */
    static Color Black()
    {
        return Color::table256(0);
    }

    /**
     * @brief @brief Gets the default bright black color.
     *
     * @return A new Color instance representing the default bright black color.
     */
    static Color BrightBlack()
    {
        return Color::table256(8);
    }

    /**
     * @brief @brief Gets the default red color.
     *
     * @return A new Color instance representing the default red color.
     */
    static Color Red()
    {
        return Color::table256(1);
    }

    /**
     * @brief @brief Gets the default bright red color.
     *
     * @return A new Color instance representing the default bright red color.
     */
    static Color BrightRed()
    {
        return Color::table256(9);
    }

    /**
     * @brief @brief Gets the default green color.
     *
     * @return A new Color instance representing the default green color.
     */
    static Color Green()
    {
        return Color::table256(2);
    }

    /**
     * @brief Gets the default bright green color.
     *
     * @return A new Color instance representing the default bright green color.
     */
    static Color brightGreen()
    {
        return Color::table256(10);
    }

    /**
     * @brief Gets the default yellow color.
     *
     * @return A new Color instance representing the default yellow color.
     */
    static Color yellow()
    {
        return Color::table256(3);
    }

    /**
     * @brief Gets the default bright yellow color.
     *
     * @return A new Color instance representing the default bright yellow color.
     */
    static Color brightYellow()
    {
        return Color::table256(11);
    }

    /**
     * @brief Gets the default blue color.
     *
     * @return A new Color instance representing the default blue color.
     */
    static Color blue()
    {
        return Color::table256(4);
    }

    /**
     * @brief Gets the default bright blue color.
     *
     * @return A new Color instance representing the default bright blue color.
     */
    static Color brightBlue()
    {
        return Color::table256(12);
    }

    /**
     * @brief Gets the default magenta color.
     *
     * @return A new Color instance representing the default magenta color.
     */
    static Color magenta()
    {
        return Color::table256(5);
    }

    /**
     * @brief Gets the default bright magenta color.
     *
     * @return A new Color instance representing the default bright magenta color.
     */
    static Color brightMagenta()
    {
        return Color::table256(13);
    }

    /**
     * @brief Gets the default cyan color.
     *
     * @return A new Color instance representing the default cyan color.
     */
    static Color cyan()
    {
        return Color::table256(6);
    }

    /**
     * @brief Gets the default bright cyan color.
     *
     * @return A new Color instance representing the default bright cyan color.
     */
    static Color brightCyan()
    {
        return Color::table256(14);
    }

    /**
     * @brief Gets the default white color.
     *
     * @return A new Color instance representing the default white color.
     */
    static Color white()
    {
        return Color::table256(7);
    }

    /**
     * @brief Gets the default bright white color.
     *
     * @return A new Color instance representing the default bright white color.
     */
    static Color brightWhite()
    {
        return Color::table256(15);
    }

    /**
     * @brief Gets a random color.
     *
     * @return A new Color instance representing the random color.
     */
    static Color random()
    {
        return Color::hsl(rand(0, 360), rand(0, 100), rand(0, 100));
    }

    /**
     * @brief Gets a random bright color.
     *
     * @return A partial ANSI code representing the random bright color.
     */
    static Color randomBright()
    {
        return Color::hsl(rand(0, 360), 100, rand(50, 85));
    }

    /**
     * @brief Gets a random dim color.
     *
     * @return A new Color instance representing the random dim color.
     */
    static Color randomDim()
    {
        return Color::hsl(rand(0, 360), 50, rand(15, 50));
    }

    /**
     * @brief Gets the partial ansi color escape sequence.
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
    std::string chain[8];
    
}

#endif
