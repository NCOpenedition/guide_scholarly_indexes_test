const fs = require("fs");
const path = require("path");

const ROOT = ".";
const OUTPUT = "SUMMARY.md";

function getTitle(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const match = content.match(/^#\s+(.*)/m);
  return match ? match[1].trim() : path.basename(filePath, ".md");
}

function walk(dir, level = 0) {
  let result = "";
  const files = fs.readdirSync(dir).sort();

  for (const file of files) {
    if (file.startsWith(".") || file === "node_modules") continue;

    const full = path.join(dir, file);

    if (fs.statSync(full).isDirectory()) {
      result += walk(full, level + 1);
    } else if (file.endsWith(".md") && file !== OUTPUT) {
      const title = getTitle(full);
      const indent = "  ".repeat(level);
      result += `${indent}- [${title}](${full.replace(/\\/g, "/")})\n`;
    }
  }

  return result;
}

const content = "# Summary\n\n" + walk(ROOT);
fs.writeFileSync(OUTPUT, content);

console.log("SUMMARY.md généré avec succès.");
