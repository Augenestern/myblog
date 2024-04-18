---
title: git常用命令
# top: ture #文章置顶
date: 2023-11-12 09:53:17
---

git 常用命令

<!-- more -->

```ts
git clone XXXX; //克隆远程分支

git add .  //添加到本地仓库

git commit -m"操作"" //提交

git branch //查看本地分支； -a 查看本地和远程所有分支； -r 查看所有远程分支； -vv 查看本地对应远程的分支；

git checkout -b XXX //以当前本地分支作为基础新建一个XXX分支

git checkout XXX //切换分支

git checkout . //修改的代码(未提交),不修改了

git push origin newtest  //push到远程分支newtest

git push origin --delete newtest //删除远程分支

git branch --set-upstream-to=origin/newtest //切换当前分支推送的远程分支

git branch -d newtest //删除本地分支。-D强制删除没有合并的分支

git status //状态

git diff //查看差异

git pull //拉取代码

git merge xxxx //合并分支，xxx往当前分支插入；

git reset --mixed  //文件退出暂存区，但是修改保留；

git reset HEAD . //

git reset HEAD fileName // 撤销某个文件；

git reset --soft HEAD^ //撤销commit之后返回成暂存区add状态；

git reset --hard HEAD^  //直接撤销commit和add

```
