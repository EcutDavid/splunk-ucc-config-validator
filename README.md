![img](https://cloud.githubusercontent.com/assets/10692276/24508158/3cde038a-1595-11e7-86ec-3c9e89787dc3.png)

### File structure
```
.
├── validator     --> The core validator module
│   ├── package.json
│   ├── schema.json
│   ├── src
│   │   ├── index.js
│   │   ├── indexToName.js
│   │   └── jsonAST.js
│   ├── tests
│   │   ├── indexToName.js
│   │   ├── testCases
│   │   │   ├── configWithError.json
│   │   │   └── configWithoutError.json
│   │   └── validator.js
│   └── yarn.lock
└── website     --> The source code online validator webpage
    ├── cfg     --> Webpack configuration
    ├── package.json
    ├── server.js     --> Local dev server
    ├── src
    │   ├── actions
    │   │   └── index.js
    │   ├── components
    │   │   ├── ErrorList.js
    │   │   ├── FileDropper.js
    │   │   ├── Footer.js
    │   │   ├── Header.js
    │   │   └── Main.js
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── index.html.template
    │   ├── index.js
    │   ├── reducers
    │   │   └── index.js
    │   └── styles
    │       ├── _settings.scss
    │       ├── errorList.scss
    │       ├── fileDropper.scss
    │       ├── footer.scss
    │       ├── header.scss
    │       ├── main.scss
    │       └── reset.scss
    ├── webpack.config.js
    └── yarn.lock
```
