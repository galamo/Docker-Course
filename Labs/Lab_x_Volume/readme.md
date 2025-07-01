# build
`docker build . -t nodejs-app-winston`

# run
`docker run  -p 3050:3050 -v ./logs:/usr/src/app nodejs-app-winston`


# docker-compose
`docker-compose up`