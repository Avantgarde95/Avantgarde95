const fs = require("fs");

function mapBadges(input) {
  return input
    .replace(/<js\/>/g, "![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)")
    .replace(/<ts\/>/g, "![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)")
    .replace(/<html\/>/g, "![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)")
    .replace(/<css\/>/g, "![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)")
    .replace(/<python\/>/g, "![Python](https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white)")
    .replace(/<cpp\/>/g, "![C plus plus](https://img.shields.io/badge/C%2B%2B-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white)")
    .replace(/<csharp\/>/g, "![C sharp](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white)")
    .replace(/<java\>/g, "![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white)")
    .replace(/<kotlin\/>/g, "![Kotlin](https://img.shields.io/badge/Kotlin-0095D5?&style=for-the-badge&logo=kotlin&logoColor=white)")
    .replace(/<react\/>/g, "![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)")
    .replace(/<mui\/>/g, "![Material UI](https://img.shields.io/badge/Material--UI-00C4EC?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGNSURBVDhP5dQ7SMNAHMfxpOKTLqIgioKbuIiC4CK6FBUdC3ZxEVwcBAc3hyPgLjh0UxzFwUGEDlIHnQTBoYrvydciiFNFxPP7z6XN9RF07w8+uUcv/yaXtE6tR2k36EXnjzWxoJWFkxwvaafMRFmUjmGe3hNtdzA3gnMUzwkLOk4j+pFhwQH6/FmJ0qMcT7GFLjRAojCIZn9E7IL2rcwgR6EN7NA/xrB8UJZPbOLIHxG7YCEfyKAeS0jhB3vQsJN0PHcBco6fald4zYJp2gRyyGKIuSRtHmE8V3MHHWgJZqpeoYnnZjGABKSwpPQJK73I8R4T/phE7WFplG5Hml6TmShmDnEUz7ULnuEE4T4pXYdlereQq5Hs4tV0Ky8iLOi5jxijJ3tVSBvW0YoLjLMmhTxf1MvYvI9WKvfQc1+CXnme8UChONboX6EH33iDn+iHYvKObchrI7+kG8hDWIXs5yHkDZCt8hP9IOwoLS+13Lr8YiR3WKHQvhmG+V9BiflTmEUn0hT7kumaj+P8AjrWbGRTmZ0EAAAAAElFTkSuQmCC&logoColor=white)")
    .replace(/<redux\/>/g, "![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)")
    .replace(/<unity\/>/g, "![Unity](https://img.shields.io/badge/Unity-100000?style=for-the-badge&logo=unity&logoColor=white)")
    .replace(/<heroku\/>/g, "![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)")
    .replace(/<node\/>/g, "![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)")
    .replace(/<mobx\/>/g, "![MobX](https://img.shields.io/badge/mobx-%23FF9955.svg?&style=for-the-badge&logo=mobx&logoColor=black)")
    .replace(/<ethereum\/>/g, "![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white)")
    .replace(/<scss\/>/g, "![SCSS](https://img.shields.io/badge/Scss-CC6699?style=for-the-badge&logo=sass&logoColor=white)")
    .replace(/<next\/>/g, "![Next.js](https://img.shields.io/badge/Next-212121?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAITcAACE3ATNYn3oAAAITSURBVDhPnVUxixpBFB4VFVs79xeIjaCHiK0WIkIIJJLm0ihqYWthIQj+h7MS/QEJpLFREWtRrOwV1mijhSIpFF7et5k7M7dzmyMfPH37zbzv7ey8N+MSGhBRgP8+7Xa7j4vFIn44HAyXyyWCweDPeDw+D4VCP3j8G3O/rAAnsNiX0Whk5nI58nq9BOpvA5fP52k8HpuYy5wePOg5nU5P1WqVOLNN6LVhTrlcpvP5/IRY5lRALJPJaIOdDDGIZf8OvDqywf0fq1QqLCGXz04A3+w9y3zLEAsNaEHwKzbg9aRkMkmFQsHGt9ttymazNh4ajEex3W6/63YTgbfbjVKplMJPJhOq1WoKB4MGtNxcZw/X65U5Oy6Xi+h2uyIQQFn+AS9PeiqgAS338Xg0JGfDYDAQpmmKVqslGWdAyy19LZC1VCqJYrEoEomEZJ3hRjtJX4vNZiPq9bq1dL/fL9brtRyxA1pu7s0Ff1BJ6dHv9y3hZrMpGo2G4N6WI3dAA32OsnnUlQ12udfrvTwbhkH7/Z5isRh5PB5lLuylbPhHW9iRSIQ4o8KhLpfLJfl8PoVXChtg592t1+l0iHdd4RALDfbvQIOn02llos64Jmk2m1E0GrWetYcDwBms4wvZ/tXX4XCYptOpdSggBrHM64FXHw6HjgcsxlarlfaAdboCPvMV8GE+nz88d9PzFcA7/sYVIMRvOb7F5mfgXYAAAAAASUVORK5CYII=&logoColor=white)")
    .replace(/<serverless\/>/g, "![Serverless](https://img.shields.io/badge/Serverless-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)")
    .replace(/<router\/>/g, "![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)")
    .replace(/<electron\/>/g, "![Electron](https://img.shields.io/badge/Electron-222222?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARdSURBVEhLrZbZT9xVFMe/s7BYoEUIlG2AUkDL1qkQxFpspDSRWrokjVWxNnFreTfGF+Oj/gOKtfFJqsHlWYMJAm1NGy1tMUPZLEOH0hlACjNQwJkBv+fMb2AGJk1M/CSHe+/5ze+ce89yf5jwGMqr9hdxOE1pkCUlgyJMUxyULkqHo/+3u6KMRUwHNLyLwyeUUxSL6B5DkPIj5UM6GlNNBFsc0PgbHNooyaqIID2/AMFgAHP37xuaKBYorXTSHlqGiNodjX/A4TNKgioi2JGdjbLDh5FbVo6p0VH4V5aNJ+vEU05m7rQtTXtcV0OqCAfGzsV4zLBZ4uJQVFsLS3wc8qr2wjM8DP/yFifybiOd/EUn/WFFOOai2BKWSKwJPNjaGkxmC+rfehtdbdwP1zGQcFVJTvQE9HiBwz6ZCwlJSSh6tg6F1TXI2F2MYMCPR3NzWA0GVeLoyGQ2Iy0vDzkMWVJ6OhZmZvSZgYQrm6f4wcTdSykOU9RZwTPVsNntGO7thdfjhjU+Xo0tzs6i5EA9MktKsOLzYainG3uPNuP37zrwZJ4NpfUvYLD7V7iHBsWMIN5Krfwjda7GTSYTCmtq0POlHGiD4ucPIK+iUo2KhFleWETQ78fkgAOTdwZw8N1zkQ7E5mkz/0gTKdbERIZi3lgBiSkpOHiuFQEms/tCGx4M3jGehPAMD+mJFOYiRmU1iAPpUMW/tESjoTyn5uZi/5tncf1SO5w3/lDdZmZd95gHm7Hilq0SkCjKxUG4/RXf1BQyinbDfvQYur9oYxh8xhP+kPq0/HxjBSzNzyNx+3adZ7IYHk5M6DyCDHEQxZ8//4SqIy/j8lcXI6tCaf7oY7z0vvRiiNVAEGaLVQuhoqkJjl86jScbWFiirRxTQkvA3nwcI1cuw37iBCb6+xnajTqXRI5evaIlK0jzZT29RxM76XDEajyPnEBuxXWSWdPTY3cx0NnJBJ/XnggjSZ0Z27jPJDzLPq8alnDFwCEO5MpVxNgTqanaSLMTLlxr/xrPnTmL/H3rPRhFmi2fcXfpXN618QqRnomgS1YdFA22/dhxNlgPal9rkSWWvF4m+nMkJrNc3zuPnaWlqg+TVfoUPCMjOq9rOYO4bds0xAZis8PCdn7IPEiplst1nJqTo/UszSOUHWrUDnXdvqXNVtbYiMziEjalGb5pj3Z1xq4i7Gk4pE3nm/Lg73GnvPo976KLWy47OerK4qKolcqmI3jA5M449SUlITlZw5GUlgYza9/rduPerZswWSz4J/SuXHaVdODUK4KnmOMpJJgnuYuo63rGOYa611sw3teHtdVV1Zl5pYjja9+0wz04qPW/GgjoCYiU3Ts03isLdSDI/U0njzhtpKw7EaOzLpd29bLXhx1ZWag+9Qquf3tJO38TYlw+nfJFVKJ2KzBckmH5wXpvCNJMBby+pfnG+27ojjcR85O5xYFAJ4UcPqX8/x/9SIzkv0p5kVJB+Y//tgD/AgkDtTkIRYaHAAAAAElFTkSuQmCC&logoColor=white)")
    .replace(/<emotion\/>/g, "![Emotion](https://img.shields.io/badge/Emotion-C346A8?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARlSURBVDhPdZRrbFNlGMf/59Lbabeu3UrXrRubsG7sXqVgAkNFmBNYFi9BISEGNUqMErN4+UDwgxE/gMagqMEL0RhJTMShAY0ajG7GOQSWXUq3zq6zq3SM9d61PT3tOZ4dTqq14ZecvG+e93n+5/++73MOgVtw8qnj5U1E/WkVqeoCAZ6n+BmW4n4KKG98tPfoEy45rYhbCn722MevdmjXHib+l5KjeD6qTnw4khl78aXjh+JyOE+R4NTUFDH75tjRLCv0U6DJGt2q4iQxkGJYl1PwdO9/44BfjkpQ8phnW/rOZ+uU1tdKFAzhjHkQYVNQkBQYWiVn3ETB0SaDQr+zfWP76e9+/yElh0HKYx4TbTy4MvICjztalqFqOIfJuA/u2H+MiA4JpVi6zDe2U01H5KhEgeCxY0d1CoFuWJkvJJdgqA4AzQZk3WEEkyH40ouI55ZBqigIHI9YSeoaG8088N4zb1klAZECQYqgqZVLWMxcR1j7K1y6MELvdqI5WALKG4E/dxkLbBDJZAqCAjAL5VWzpP8VRYLeJ0sUCva/0B/lwCVY42+wrP8DXw9YUOVLSmuOvouwbxlEgp7CSGQYS6kwiAzQUmNTTdDTH0hJIkVnKBDwKg0B/LVgQYhzY3zTJJLqOMatZcgQClyITGMmOodIKgE2mxH3Q1BvnzoRlMuLBTM8N/rLQifquUfQU9eAezv64NxJoKfRhWbHNnRvpGBzBCWHaYKDN+YbkkslitpmTVXjo51lqVa15yp0P67BUFUUTz58BiZ1GprsBNrqFmEui2DYSUFFmL7Yc2L/O3KpRIHDgzue74klUrtvXCuH/1I1Bvt02PPQWWiFBKLJf9ubEKdh8eKG58eW5FCevODTuw/UCJywl6XZM/5YGKN2HvfvOIvK7CKuDAhwngPioZuiV92lQMgGZLHvuQcPVkpBmfyWLzsvxTpbOobVrOYwRdIGVktjQqGG3fQ3atfmULE6C62BwJezTbg8eI/YMjrcoIOHCJ7QX3SPXJVlCs9ww7qNjtqK+u7JrZ0mt60SgbQR80skzLxfbGwKX7nrcIrfj+vbN0FvKMeWTJlBaaaOfDv8/c3eEik4Q7ve5vA2V6tIs0nQtLWBrLZie6Ub6xtzaK3nsb4iAIYhQTIMfGYGMxrCYY4bT8rlEnmHr7/8ydaWrNmumw+VVDt9xlWuOVW6xgyKDKKrYhZK8csY9FuwyHVh87lRdIzNww4LSmlt7d1d9xlzZuXI9LSTzTtU55SP5xhdv8PQtKVDv7bUtszgrm8mMDfeCk+4BH5x66NTm7H5wgxu582w2qehpdWIkoTWx2Z2dVs3MCs6eYdqZcYUr63Z1cqWQkOpxL7TQ00pobkewwwHzPnV0P/ZhHX61ahQl4o/Bhe4aD1+jk3g/JVPqQSTen9y0hmXBHt7e83XQoGBUMCr4RvXwcZqpZesOGDEx7tAIxe04DaVFRbGKK0RkSo4+TDOj3+OWCahUSiUYY/HM/QPnwGrCh3ur7kAAAAASUVORK5CYII=&logoColor=white)")
    .replace(/<eslint\/>/g, "![ESLint](https://img.shields.io/badge/ESLint-100000?style=for-the-badge&logo=eslint&logoColor=white)")
    .replace(/<stylelint\/>/g, "![StyleLint](https://img.shields.io/badge/StyleLint-100000?style=for-the-badge&logo=stylelint&logoColor=white)")
    .replace(/<webpack\/>/g, "![Webpack](https://img.shields.io/badge/Webpack-100000?style=for-the-badge&logo=webpack&logoColor=white)")
    .replace(/<jest\/>/g, "![Jest](https://img.shields.io/badge/Jest-100000?style=for-the-badge&logo=jest&logoColor=white)")
    .replace(/<storybook\/>/g, "![Storybook](https://img.shields.io/badge/Storybook-100000?style=for-the-badge&logo=storybook&logoColor=white)")
    ;
}

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

const template = mapBadges(fs.readFileSync("Template.md").toString());

const korean = mapLanguage(mapLanguage(template, "ko", part => part), "en", part => "");
const english = mapLanguage(mapLanguage(template, "en", part => part), "ko", part => "");

fs.writeFileSync("README.md", korean);
fs.writeFileSync("English.md", english);
