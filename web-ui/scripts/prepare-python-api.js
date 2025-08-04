#!/usr/bin/env node

/**
 * Script to copy required files from root to python-api directory before Docker build.
 * This ensures main.py and requirements.txt are available for the Python API container
 * while keeping them in .gitignore to avoid duplication.
 */

import { access, copyFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Paths
const ROOT_DIR = join(__dirname, "..", "..");
const PYTHON_API_DIR = join(__dirname, "..", "python-api");

const FILES_TO_COPY = [
  {
    source: join(ROOT_DIR, "main.py"),
    target: join(PYTHON_API_DIR, "main.py"),
    name: "main.py",
  },
  {
    source: join(ROOT_DIR, "requirements.txt"),
    target: join(PYTHON_API_DIR, "requirements.txt"),
    name: "requirements.txt",
  },
];

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function copyFiles() {
  console.log("Preparing Python API files...");

  for (const file of FILES_TO_COPY) {
    try {
      // Check if source file exists
      if (!(await fileExists(file.source))) {
        console.error(`Source file not found: ${file.source}`);
        process.exit(1);
      }

      // Copy file
      await copyFile(file.source, file.target);
      console.log(`Copied ${file.name} to python-api/`);
    } catch (error) {
      console.error(`Failed to copy ${file.name}:`, error.message);
      process.exit(1);
    }
  }

  console.log("Python API files prepared successfully!");
}

// Run the script
copyFiles().catch((error) => {
  console.error("Script failed:", error.message);
  process.exit(1);
});
