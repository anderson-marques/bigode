# Pug Generator

Pug generator that get the a context in JSON format and a template folder as arguments and creates a project.

- It uses pug template engine to process the template folder
- Pug files should be suffixed with `.pug` extension. Example: `index.html.pug` -> `index.html`

```bash
pug-generator context.json ./my-company-spring-boot-template
```

## Usage with inquire

The Pug generator fits well with the [Inquire CLI](https://github.com/anderson-marques/homebrew-inquire). 

Example:

```bash
inquire -q ./questions.js
$ Inform your project name my-new-microservice
$ Choose between Java or Kotlin:
[x] - Kotlin
[ ] - Java
pug-generator answers.json ./my-company-spring-boot-template
```
