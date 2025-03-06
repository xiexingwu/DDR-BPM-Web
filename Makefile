install:
	pnpm install

build:
	pnpm run build

deploy: build
	firebase deploy
