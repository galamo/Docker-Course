# MySQL docker

Running the following command will download MySQL docker image and Run it.
The Image will be downloaded from Docker Hub, and running the container in your machine

- Command template: `docker run [options] IMAGE [command] [arguments]`

- Running MySQL Container

```cmd
docker run --name mysql-container-test -e MYSQL_ROOT_PASSWORD=root -e MYSQL_ROOT_USER=root -d mysql
```

- Expose Port

```cmd
docker run --name mysql-container-test -e MYSQL_ROOT_PASSWORD=root -e MYSQL_ROOT_USER=root -p 3306:3306 -d mysql
```

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

## Volume

- Volume cleanup
- Run `docker volume ls` - to see all volums
- Run `docker volume rm -f $(docker volume ls -q)` - remove all volumes
- Run `docker volume prune -f` - remove unused volums

- Search Container with specific volume:
- RUn `docker ps -a --filter volume=<volume_name>`
  `

- Create new Schema

```sql
 CREATE DATABASE `test_schema` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
```

- Creatre new Table

```sql

CREATE TABLE users (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash CHAR(60) NOT NULL, -- bcrypt hash
    full_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL DEFAULT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_admin BOOLEAN DEFAULT FALSE,

    PRIMARY KEY (id),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

```

- Insert Data

```sql

INSERT INTO users (username, email, password_hash, full_name)
VALUES (
  'johndoe',
  'john@example.com',
  '$2y$10$KbQ2EJeZfpOjFyMXNlqzQObrM6gtzEjHFuYevFAYCq4tCmQ7kGo0u', -- bcrypt hash
  'John Doe'
);


```

- Run `docker stop`
- Run `docker start`
- Run `docker restart` - same like stop and then starting the container

## Attach specific Script or Seed Data into MySQL

- Run this command from the Folder Lab_1
- without `-d` flag, running with logs

```cmd
docker run --name mysql-container-test_2 \
-e MYSQL_ROOT_PASSWORD=root \
-e MYSQL_ROOT_USER=root -p 3306:3306 \
-v ./data:/docker-entrypoint-initdb.d:ro \
 mysql
```



## Check if you have MYSQL data:
1. cd dev-apps
2. npm init -y
2. npm install mysql2
