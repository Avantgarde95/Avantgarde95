const fs = require("fs");

function mapLanguage(input, language, mapper) {
  let index = 0;
  const parts = [];
  const start = `<${language}>`;
  const end = `</${language}>`;

  while (index < input.length) {
    if (input.startsWith(start, index)) {
      const endIndex = input.indexOf(end, index + start.length);

      if (endIndex < 0) {
        throw new Error(`Cannot find ${end}!`);
      }

      parts.push(mapper(input.slice(index + start.length, endIndex)));
      index = endIndex + end.length;
    } else {
      parts.push(input[index]);
      index++;
    }
  }

  return parts.join("");
}

const template = fs.readFileSync("Template.md").toString();

const korean = mapLanguage(mapLanguage(template, "ko", part => part), "en", part => "");
const english = mapLanguage(mapLanguage(template, "en", part => part), "ko", part => "");

fs.writeFileSync("README.md", korean);
fs.writeFileSync("English.md", english);
