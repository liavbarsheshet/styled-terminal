"""
File: errors.py

Extends support for custom error handling.

Author: Liav Barsheshet <liavbarsheshet@gmail.com> © 2025
"""


class STError(Exception):
    """
    Base error class for styled-terminal.
    """

    def __init__(self, message: str = "Oops something went wrong!"):
        super().__init__(f"[styled-terminal] {message}")


class InvalidParameter(STError):
    """
    Represents an error for invalid parameters.
    """

    def __init__(self, param: str, legal: str):
        """
        Constructor

        Parameters:
        param (str): The invalid parameter name.
        legal (str): The expected valid format or value.
        """
        super().__init__(f"The parameter '{param}' is invalid. It should be {legal}.")
