rsync -avz --exclude-from .gitignore . yj:~/repos/weixin;
ssh yj 'cd repos/weixin; bash build.sh'
