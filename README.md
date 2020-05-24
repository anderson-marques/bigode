# Bigode

Bigode is a CLI generator tool that takes a projectName, a templateFolder embeded with Mustache tags, and a context file in JSON and generates a new project.

- It uses Mustache template engine to process the template folder

```bash
bigode \
  --project-name my-new-awesome-project \
  --template-project ./my-company-spring-boot-template \
  --context-file context.json
```

You can install `bigode` in MacOS using Homebrew:

```
brew tap anderson-marques/taps && brew install bigode
```

## Usage with inquire CLI

The Bigode generator fits well with the [Inquire CLI](https://github.com/anderson-marques/inquire).

You can install `inquire` in MacOS using Homebrew:

```
brew tap anderson-marques/taps && brew install inquire
```

Example or inquire usage:

```bash
$ inquire \
  --questions-file ./spring-boot-questions.js\
  --answers-file context.json
$ Inform your project name my-new-awesome-project
$ Choose between Java or Kotlin:
[x] - Kotlin
[ ] - Java
$ ? Actuator (y/N): y
$
$
$ bigode \
  --project-name my-new-awesome-project \
  --template-project ./templates/my-amazing-company-spring-boot-template \
  --context-file context.json
```
