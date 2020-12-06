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

- launch docker compose

```
docker-compose up -d
```

- To go inside container

```
docker exec -it <container id> /bin/bash
```

Docker mapped the 8080 port inside of the container to the port 49160 on your machine.

```
curl -i localhost:49160
```

Lexique
=

* Node : Environnement d'execution. Permet d'écrire du JavaScript côté serveur.

* ts-node : Node.js ne supporte pas le Typescript. En passant par l'executable ts-node
au lieu de l'executable node, on utilise un wrapper Typescript qui va compiler le code et 
le fournir au runtime Node.js

* Express : Framework WEB pour node. Permet de créer une API REST

* Nodemon : Outils qui restart l'application node quand des fichiers ont changé

* argon2-pass : Wrapper de la lib Argon2Id (Fonction de Hash de mot de passe)
