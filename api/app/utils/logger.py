import logging
import sys

# Colors for different log levels
RED = "\033[91m"
YELLOW = "\033[93m"
BLUE = "\033[94m"
GREEN = "\033[92m"
RESET = "\033[0m"


class ColoredFormatter(logging.Formatter):
    COLORS = {
        "DEBUG": GREEN,
        "INFO": BLUE,
        "WARNING": YELLOW,
        "ERROR": RED,
        "CRITICAL": RED,
    }

    def formatTime(self, record, datefmt=None):
        """Override formatTime to remove milliseconds"""
        if datefmt:
            return logging.Formatter.formatTime(self, record, datefmt)
        return logging.Formatter.formatTime(self, record).split(",")[0]

    def format(self, record):
        color = self.COLORS.get(record.levelname, BLUE)
        record.levelname = f"{color}{record.levelname}{RESET}"
        record.message = f"{color}{record.getMessage()}{RESET}"
        record.asctime = f"{color}{self.formatTime(record)}{RESET}"
        return " %(asctime)s   %(levelname)s   %(message)s" % record.__dict__


console_handler = logging.StreamHandler(sys.stdout)
console_handler.setFormatter(ColoredFormatter())

logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)
logger.addHandler(console_handler)
logger.propagate = False
