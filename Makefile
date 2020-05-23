run:
	@node simple-generator.js

build:
	@rm -rf ./dist && mkdir dist
	@./node_modules/.bin/pkg package.json --out-path ./dist