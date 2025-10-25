#!/bin/bash

# Script to move opencodes CSV files to the results/opencodes directory
# Run this after downloading exported CSV files

DOWNLOADS_DIR="$HOME/Downloads"
TARGET_DIR="../../results/opencodes"

# Create target directory if it doesn't exist
mkdir -p "$TARGET_DIR"

# Find and move opencodes CSV files from Downloads
echo "Looking for opencodes CSV files in Downloads..."

for file in "$DOWNLOADS_DIR"/opencodes_*.csv; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        echo "Moving $filename to results/opencodes/"
        mv "$file" "$TARGET_DIR/"
        echo "✅ Moved $filename successfully"
    fi
done

echo "Done! Check the results/opencodes/ directory for your files."