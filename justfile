run: clean
    npm run dev

build: clean
    npm run build

clean:
    rm -rf ./.pages
    rm -rf ./dist
    rm -rf ./src/.observablehq

fmt:
    npm run fmt

publish: build
    git clone https://github.com/ToastShaman/dora-dashboard.git .pages
    cd .pages && git checkout gh-pages && rm -rf * && touch .nojekyll
    mv ./dist/* .pages/
    cd .pages && git add . && git commit -m "Publish" && git push
