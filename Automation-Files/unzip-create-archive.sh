#!/usr/bin/bash
# This program is writen to authomate the creation of archive files
# and Extracting them
#
# This will be further developed with some logics

FILE=$1
FOLDER=$2

# tar -cf archive.tar foo bar  # Create archive.tar from files foo and bar.
# tar -cf $FILE # To be completed
# tar -tvf archive.tar         # List all files in archive.tar verbosely.
# tar -xf archive.tar          # Extract all files from archive.tar.

# Extract File
# tar -xf $FILE

# Another Method to Extract File
tar xzf $FILE 
