from styled_terminal import Style, Color, InvalidParameter
import unittest

class TestColorErrorHandling(unittest.TestCase):
    def test_invalid_rgb_values(self):
        with self.assertRaises(InvalidParameter):
            Color.rgb(300, 0, 0)
    
    def test_invalid_hex_code(self):
        with self.assertRaises(InvalidParameter):
            Color.hex("invalid")
    
    def test_invalid_256_color_index(self):
        with self.assertRaises(InvalidParameter):
            Color.table256(-1)

if __name__ == "__main__":
    unittest.main()