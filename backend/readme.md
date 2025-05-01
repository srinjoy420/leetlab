1.first create 2 folder our backend and frontend then start with the backend

2.initalize our nodejs
3.create a server of express
4.create prisma for database use we postgress sql create a schema the database
5.prisma command 
    npm i prisma
    npm i @prisma/client
    npx prisma init
6.prisma npx prisma generate 
7.import prismaclient from generate index.js
8.authdata migration (npx prisma migrate dev)
9.npx prisma db push
10. controller
11.to generate randowm token (openssl rand -hex 32)
//////authentication ends here///////////////
12.create a model in prisma schema

13.go to judge0 website and click get started

14.windowa powershell 
   wsl --install
    sudo apt update
    sudo apt upgrade -y
     sudo nano /etc/default/grub
     sudo apt install -y docker
     sudo apt install -y docker.io
15. install judge0
     wget https://github.com/judge0/judge0/releases/download/v1.13.1/judge0-v1.13.1.zip
     unzip judge0-v1.13.1.zip
     ls
     cd judge0-v1.13.1
     ls
     nano judge0.conf
     create redis and postgress password 
     ctrl x to exit
     cd judge0-v1.13.1
docker-compose up -d db redis
sleep 10s
docker-compose up -d
sleep 5s
complete setup your judge 0

///////chapter 2 Problem managemnt
create a judge.libs.js in libs
npx prisma studio for check the database

