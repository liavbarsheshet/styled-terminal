from styled_terminal import style, Color


# Function to be tested
def print_randomness():
    for _ in range(500):
        print(style.bg(Color.random()).apply("  "), end="")


# If this file is run directly, run the tests
if __name__ == "__main__":
    print_randomness()
