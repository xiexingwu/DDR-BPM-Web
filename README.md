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
```sh
export SRC=$HOME/src/DDR-BPM-Simfiles
cp -v "$SRC"/data/all_songs.txt public/
cp -v -R "$SRC"/build/songs/ public/data/
cp -v -R "$SRC"/build/jackets-160/ public/jackets/
```
