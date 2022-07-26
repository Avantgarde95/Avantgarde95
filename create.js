const fs = require("fs");

/**
 * ex. `<js/>` -> `![JavaScript](Badge URL)`
 */
function mapBadges(input) {
  // tag: [alt, name, bgColor, fgColor, icon]
  const badgeMap = {
    js: ["JavaScript", "JavaScript", "F7DF1E", null, "javascript"],
    ts: ["TypeScript", "TypeScript", "007ACC", null, "typescript"],
    html: ["HTML", "HTML", "E34F26", null, "html5"],
    css: ["CSS", "CSS", "1572B6", null, "css3"],
    python: ["Python", "Python", "14354C", null, "python"],
    cpp: ["C++", "C%2B%2B", "00599C", null, "c%2B%2B"],
    csharp: ["C#", "C%23", "239120", null, "c-sharp"],
    java: ["Java", "Java", "ED8B00", null, "java"],
    kotlin: ["Kotlin", "Kotlin", "0095D5", null, "kotlin"],
    mui: ["Material UI", "Material%20UI", "1F3758", null, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGNSURBVDhP5dQ7SMNAHMfxpOKTLqIgioKbuIiC4CK6FBUdC3ZxEVwcBAc3hyPgLjh0UxzFwUGEDlIHnQTBoYrvydciiFNFxPP7z6XN9RF07w8+uUcv/yaXtE6tR2k36EXnjzWxoJWFkxwvaafMRFmUjmGe3hNtdzA3gnMUzwkLOk4j+pFhwQH6/FmJ0qMcT7GFLjRAojCIZn9E7IL2rcwgR6EN7NA/xrB8UJZPbOLIHxG7YCEfyKAeS0jhB3vQsJN0PHcBco6fald4zYJp2gRyyGKIuSRtHmE8V3MHHWgJZqpeoYnnZjGABKSwpPQJK73I8R4T/phE7WFplG5Hml6TmShmDnEUz7ULnuEE4T4pXYdlereQq5Hs4tV0Ky8iLOi5jxijJ3tVSBvW0YoLjLMmhTxf1MvYvI9WKvfQc1+CXnme8UChONboX6EH33iDn+iHYvKObchrI7+kG8hDWIXs5yHkDZCt8hP9IOwoLS+13Lr8YiR3WKHQvhmG+V9BiflTmEUn0hT7kumaj+P8AjrWbGRTmZ0EAAAAAElFTkSuQmCC"],
    react: ["React", "React", "4395D1", null, "react"],
    redux: ["Redux", "Redux", "593D88", null, "redux"],
    unity: ["Unity", "Unity", "100000", null, "unity"],
    heroku: ["Heroku", "Heroku", "430098", null, "heroku"],
    node: ["Node.js", "Node.js", "43853D", null, "node.js"],
    mobx: ["MobX", "MobX", "D86C31", null, "mobx"],
    ethereum: ["Ethereum", "Ethereum", "3C3C3D", null, "Ethereum"],
    scss: ["SCSS", "SCSS", "CC6699", null, "sass"],
    next: ["Next.js", "Next.js", "474747", null, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAITcAACE3ATNYn3oAAAITSURBVDhPnVUxixpBFB4VFVs79xeIjaCHiK0WIkIIJJLm0ihqYWthIQj+h7MS/QEJpLFREWtRrOwV1mijhSIpFF7et5k7M7dzmyMfPH37zbzv7ey8N+MSGhBRgP8+7Xa7j4vFIn44HAyXyyWCweDPeDw+D4VCP3j8G3O/rAAnsNiX0Whk5nI58nq9BOpvA5fP52k8HpuYy5wePOg5nU5P1WqVOLNN6LVhTrlcpvP5/IRY5lRALJPJaIOdDDGIZf8OvDqywf0fq1QqLCGXz04A3+w9y3zLEAsNaEHwKzbg9aRkMkmFQsHGt9ttymazNh4ajEex3W6/63YTgbfbjVKplMJPJhOq1WoKB4MGtNxcZw/X65U5Oy6Xi+h2uyIQQFn+AS9PeiqgAS338Xg0JGfDYDAQpmmKVqslGWdAyy19LZC1VCqJYrEoEomEZJ3hRjtJX4vNZiPq9bq1dL/fL9brtRyxA1pu7s0Ff1BJ6dHv9y3hZrMpGo2G4N6WI3dAA32OsnnUlQ12udfrvTwbhkH7/Z5isRh5PB5lLuylbPhHW9iRSIQ4o8KhLpfLJfl8PoVXChtg592t1+l0iHdd4RALDfbvQIOn02llos64Jmk2m1E0GrWetYcDwBms4wvZ/tXX4XCYptOpdSggBrHM64FXHw6HjgcsxlarlfaAdboCPvMV8GE+nz88d9PzFcA7/sYVIMRvOb7F5mfgXYAAAAAASUVORK5CYII="],
    aws: ["AWS", "AWS", "E18E28", null, "amazonaws"],
    router: ["React Router", "React_Router", "CA4245", null, "react-router"],
    emotion: ["Emotion", "Emotion", "C346A8", null, "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARlSURBVDhPdZRrbFNlGMf/59Lbabeu3UrXrRubsG7sXqVgAkNFmBNYFi9BISEGNUqMErN4+UDwgxE/gMagqMEL0RhJTMShAY0ajG7GOQSWXUq3zq6zq3SM9d61PT3tOZ4dTqq14ZecvG+e93n+5/++73MOgVtw8qnj5U1E/WkVqeoCAZ6n+BmW4n4KKG98tPfoEy45rYhbCn722MevdmjXHib+l5KjeD6qTnw4khl78aXjh+JyOE+R4NTUFDH75tjRLCv0U6DJGt2q4iQxkGJYl1PwdO9/44BfjkpQ8phnW/rOZ+uU1tdKFAzhjHkQYVNQkBQYWiVn3ETB0SaDQr+zfWP76e9+/yElh0HKYx4TbTy4MvICjztalqFqOIfJuA/u2H+MiA4JpVi6zDe2U01H5KhEgeCxY0d1CoFuWJkvJJdgqA4AzQZk3WEEkyH40ouI55ZBqigIHI9YSeoaG8088N4zb1klAZECQYqgqZVLWMxcR1j7K1y6MELvdqI5WALKG4E/dxkLbBDJZAqCAjAL5VWzpP8VRYLeJ0sUCva/0B/lwCVY42+wrP8DXw9YUOVLSmuOvouwbxlEgp7CSGQYS6kwiAzQUmNTTdDTH0hJIkVnKBDwKg0B/LVgQYhzY3zTJJLqOMatZcgQClyITGMmOodIKgE2mxH3Q1BvnzoRlMuLBTM8N/rLQifquUfQU9eAezv64NxJoKfRhWbHNnRvpGBzBCWHaYKDN+YbkkslitpmTVXjo51lqVa15yp0P67BUFUUTz58BiZ1GprsBNrqFmEui2DYSUFFmL7Yc2L/O3KpRIHDgzue74klUrtvXCuH/1I1Bvt02PPQWWiFBKLJf9ubEKdh8eKG58eW5FCevODTuw/UCJywl6XZM/5YGKN2HvfvOIvK7CKuDAhwngPioZuiV92lQMgGZLHvuQcPVkpBmfyWLzsvxTpbOobVrOYwRdIGVktjQqGG3fQ3atfmULE6C62BwJezTbg8eI/YMjrcoIOHCJ7QX3SPXJVlCs9ww7qNjtqK+u7JrZ0mt60SgbQR80skzLxfbGwKX7nrcIrfj+vbN0FvKMeWTJlBaaaOfDv8/c3eEik4Q7ve5vA2V6tIs0nQtLWBrLZie6Ub6xtzaK3nsb4iAIYhQTIMfGYGMxrCYY4bT8rlEnmHr7/8ydaWrNmumw+VVDt9xlWuOVW6xgyKDKKrYhZK8csY9FuwyHVh87lRdIzNww4LSmlt7d1d9xlzZuXI9LSTzTtU55SP5xhdv8PQtKVDv7bUtszgrm8mMDfeCk+4BH5x66NTm7H5wgxu582w2qehpdWIkoTWx2Z2dVs3MCs6eYdqZcYUr63Z1cqWQkOpxL7TQ00pobkewwwHzPnV0P/ZhHX61ahQl4o/Bhe4aD1+jk3g/JVPqQSTen9y0hmXBHt7e83XQoGBUMCr4RvXwcZqpZesOGDEx7tAIxe04DaVFRbGKK0RkSo4+TDOj3+OWCahUSiUYY/HM/QPnwGrCh3ur7kAAAAASUVORK5CYII="],
    electron: ["Electron", "Electron", "2F3041", null, "electron"],
    eslint: ["ESLint", "ESLint", "7c7ce3", null, "eslint"],
    stylelint: ["Stylelint", "Stylelint", "100000", null, "stylelint"],
    webpack: ["Webpack", "Webpack", "3A76BA", null, "webpack"],
    jest: ["Jest", "Jest", "8C7079", null, "jest"],
    storybook: ["Storybook", "Storybook", "CB3665", null, "storybook"],
    ionic: ["Ionic", "Ionic", "100000", null, "ionic"],
    socketio: ["Socket.io", "Socket.io", "gray", null, "socketdotio"],
    opengl: ["OpenGL", "OpenGL", "gray", null, "opengl"],
    solidity: ["Solidity", "Solidity", "363636", null, "solidity"],
    express: ["Express", "Express", "100000", null, "Express"],
    winapi: ["WinAPI", "Win%20API", "3171CD", null, "windows"],
  };

  let result = input;

  for (const [tag, [alt, name, bgColor, fgColor, icon]] of Object.entries(badgeMap)) {
    const finalBGColor = bgColor === null ? "100000" : bgColor;
    const finalFGColor = fgColor === null ? "FFFFFF" : fgColor;
    result = result.replace(new RegExp(`<${tag}/>`, "g"), `![${alt}](https://img.shields.io/badge/${name}-${finalBGColor}?style=for-the-badge&logo=${icon}&logoColor=${finalFGColor})`)
  }

  return result;
}

/**
 * Map `<project-code/>` to "Code" image.
 */
function mapCode(input) {
  return input.replace(/<project-code\/>/g, "![Code](images/Code.svg)");
}

/**
 * Map `<language>Content</language>` to the result of `mapper(Content)`.
 * ex. `mapLanguage("<ko>가나다</ko>", "ko", part => "하핳")` gives `하핳`.
 */
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

const template = mapCode(mapBadges(fs.readFileSync("Template.md").toString()));

const korean = mapLanguage(mapLanguage(template, "ko", part => part), "en", part => "");
const english = mapLanguage(mapLanguage(template, "en", part => part), "ko", part => "");

fs.writeFileSync("README.md", korean);
fs.writeFileSync("English.md", english);
