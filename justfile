run: clean
    npm run dev

build: clean
    npm run build

clean:
    rm -rf ./dist
    rm -rf ./src/.observablehq

fmt:
    npm run fmt
