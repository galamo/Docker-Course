# MySQL docker

Running the following command will download MySQL docker image and Run it.
The Image will be downloaded from Docker Hub, and running the container in your machine

- `docker run [options] IMAGE [command] [arguments]`
- Run `docker run --name mysql-container-test -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql`

## Result

- Run `docker images` - what will be the result?
- Run `docker ps`
- Run `docker stop mysql-container-test`
- Run Again `docker ps` - what this command show?
- Run `docker ps -a` - what this command show?
- Run `docker start mysql-container-test` - what this command show?
- Run `docker stats`
- Run `docker exec -it <ContainerId> bash` Or `docker exec -it <ContainerId> mysql -u root -p`
- Run `docker stop mysql-container-test`
- Run `docker rm <ContainerId>`
- Run `docker rmi <ImageId>`
