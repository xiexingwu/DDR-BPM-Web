install:
	pnpm install

build:
	pnpm run build

zip:
	7z a -tzip public/data.zip -w public/data/.
	7z a -tzip public/jackets.zip -w public/jackets/.

deploy: build zip
	firebase deploy
