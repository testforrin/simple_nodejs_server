# Description

Very simple NodeJS HTTP server with counter

# Links

- [`GitHub`](https://github.com/testforrin/simple_nodejs_server)
- [`DockerHub`](https://hub.docker.com/r/testforrin/simple_nodejs_server)

# Usage

To persist counter data and logs run with data directory mount:
```console
$ docker run -p 80:8080 --mount type=bind,source=/home/ec2-user/data,target=/simple_nodejs_server/data testforrin/simple_nodejs_server
```
