const fs = require("fs");
const path = require("path");

const LANGS = ["en", "fr"];
const OUTPUT = "SUMMARY.md";

function getTitle(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const match = content.match(/^#\s+(.*)/m);
  return match ? match[1].trim() : path.basename(filePath, ".md");
}

function walk(dir, level = 1) {
  let result = "";
  const files = fs.readdirSync(dir).sort();

  for (const file of files) {
    if (file.startsWith(".")) continue;

    const full = path.join(dir, file);

    if (fs.statSync(full).isDirectory()) {
      result += walk(full, level + 1);
    } else if (file.endsWith(".md")) {
      const title = getTitle(full);
      const indent = "  ".repeat(level);
      result += `${indent}- [${title}](${full.replace(/\\/g, "/")})\n`;
    }
  }

  return result;
}

let summary = "# Summary\n\n";

for (const lang of LANGS) {
  if (!fs.existsSync(lang)) continue;

  const label = lang === "en" ? "English" : "Français";
  const intro = path.join(lang, "intro.md");

  summary += `- [${label}](${intro})\n`;
  summary += walk(lang);
  summary += "\n";
}

fs.writeFileSync(OUTPUT, summary);
console.log("SUMMARY.md multilingue généré.");

const content = "# Summary\n\n" + walk(ROOT);
fs.writeFileSync(OUTPUT, content);

console.log("SUMMARY.md généré avec succès.");
