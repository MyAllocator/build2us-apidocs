#npm install apidoc -g
apidoc -i ./ -o ./ -f ".*\\.pm$"

#patch genereted js files
git apply ./patch/*
