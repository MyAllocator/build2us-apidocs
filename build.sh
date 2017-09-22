#npm install apidoc -g
apidoc -i ./ -o ./ -f ".*\\.pm$"

#patch genereted js files
git apply ./patch/*

git add .
git commit -a -m "doc release"
git push
