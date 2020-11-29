- Build image

```
docker build -t isyl/node-web-app .
```

- run image (create a container and run *dev* script for live reload with *nodemon*)

```
docker run -dp 49160:8080 \
    -w /app -v "$(pwd):/app" \
    isyl/node-web-app \
    sh -c "cd app && yarn install && yarn run dev"
```

- To go inside container

```
docker exec -it <container id> /bin/bash
```

Docker mapped the 8080 port inside of the container to the port 49160 on your machine.

```
curl -i localhost:49160
```
