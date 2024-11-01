Source code for www.ddrbpm.com

## System dependencies
- make
- pnpm 9.5.0

## Quickstart
```sh
make install
pnpm dev
```

## Copy from DDR-BPM-Simfiles build
```
src = /path/to/DDR-BPM-Simfiles
cp -v "$src"/data/all_songs.txt public/
cp -v -R "$src"/build/songs/ public/data/
cp -v -R "$src"/build/jackets-160/ public/jackets/
```
