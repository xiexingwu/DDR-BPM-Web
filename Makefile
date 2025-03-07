install:
	pnpm install

build:
	pnpm run build

pull:
	wget -O public/data.zip https://github.com/xiexingwu/DDR-BPM-prep/releases/download/Latest/songs.zip
	wget -O public/jackets.zip https://github.com/xiexingwu/DDR-BPM-prep/releases/download/Latest/jackets.zip
	wget -O public/all_songs.txt https://github.com/xiexingwu/DDR-BPM-prep/releases/download/Latest/all_songs.txt

	unzip -o -d public/data public/data.zip 
	unzip -o -d public/jackets public/jackets.zip 

deploy: pull build
	firebase deploy
