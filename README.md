# Simple Generator

Simple generator that get the questions, and a template folder as arguments and creates a project.

It uses Inquirer Question objects in a JSON file as first argument.
It uses pug template engine to process the template folder
It creates a context from the questions object and generates a new project from scratch

```bash
simple-generator my-company-spring-boot-questions.json ./my-company-spring-boot-template
```
