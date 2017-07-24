#npm install apidoc -g
apidoc -i ./ -o ./ -f ".*\\.pm$"

git add .
git commit -a -m "doc release"
git push
