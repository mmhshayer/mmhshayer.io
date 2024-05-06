---
author: "Mohammad Mustakim Hassan"
title: "Dockerizing compose Nx"
date: "2023-08-28"
description: "Turbocharge Your Full-Stack Projects: Dockerizing Next.js, Nest.js, Redis and MongoDB with Nx Monorepo and Docker Compose"
tags: ["Docker", "Nx monorepo", "NextJs", "NestJs", "redis", "MongoDb"]
ShowToc: true
draft: true
---

Discover how to leverage Docker to streamline the development workflow of your applications.Suppose you have an application that has 2 frontend and one backend. It uses a redis database and a mongo database. You want to Dockerize it for ease of development and deployment. In that case, this blog post is for you.

## Preparation

1.Install Nx CLI

```bash
npm install -g nx
```

2.Create a new workspace

```bash
npx create-nx-workspace@latest
```

> Go through the prompts and select a **node** application with **NestJS** as the backend framework and name it **backend**.

3.Install and then create a NextJS **frontend**, **admin** application

```bash
cd <project-name>
npm install --save-dev @nx/next
nx g  @nx/next:app frontend
nx g  @nx/next:app admin
```

> Go through the prompts and select appropriate configuration, we are going for minimal with **CSS**, **no E2E test** and a **APP Router**

4.Add redis and mongo database to the backend application

```bash
npm install @nestjs/mongoose mongoose @nestjs/cache-manager cache-manager cache-manager-redis-store@2

npm install --save-dev @types/cache-manager-redis-store
```

5.Implement redis and mongo database in the backend application

```typescript
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/mydatabase'),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

```

6.Initialize git repository and make initial commit

```bash
git config --global user.name "Your Name"
git config --global user.email "eexample@email.com"
git init
git add .
git commit -m "Initial commit"
```

## Dockerizing the NestJS Applications

1.Create a Dockerfile for the frontend application

```bash
touch apps/frontend/Dockerfile
```

in the `apps/frontend/Dockerfile`, add the following code

```Dockerfile
# Use the official Node.js image as the base
FROM node:14
# Set the working directory inside the container
WORKDIR /usr/src/app/frontend
# Copy package.json and package-lock.json to the container
COPY package*.json ./
# Install dependencies
RUN npm install --silent
# Copy the rest of the frontend application code to the container
COPY . .
# Expose the port that the frontend application will run on
EXPOSE 4200
# Command to start the application
CMD ["npm", "run", "dev"]
```

2.Create a Dockerfile for the admin application

```bash
touch apps/admin/Dockerfile
```

in the `apps/admin/Dockerfile`, add the following code

```Dockerfile
# Use the official Node.js image as the base
FROM node:14
# Set the working directory inside the container
WORKDIR /usr/src/app/admin
# Copy package.json and package-lock.json to the container
COPY package*.json ./
# Install dependencies
RUN npm install --silent
# Copy the rest of the admin application code to the container
COPY . .
# Expose the port that the admin application will run on
EXPOSE 4300
# Command to start the application
CMD ["npm", "run", "dev"]
```

3.Create a Dockerfile for the backend application

```bash
touch apps/backend/Dockerfile
```

in the `apps/backend/Dockerfile`, add the following code

```Dockerfile
# Use the official Node.js image as the base
FROM node:14
# Set the working directory inside the container
WORKDIR /usr/src/app/backend
# Copy package.json and package-lock.json to the container
COPY package*.json ./
# Install dependencies
RUN npm install --silent
# Copy the rest of the backend application code to the container
COPY . .
# Expose the port that the backend application will run on
EXPOSE 3000
# Command to start the application
CMD ["npm", "run", "dev"]
```

4.Add `.dockerignore` file to the root of each application

```dockerignore
node_modules
dist
Dockerfile
.dockerignore
.git
.gitignore
```

5.Add `.gitignore` to the root of each application

```gitignore
/node_modules
/dist
```

## Configuring docker-compose.yml

The general steps to define a docker-compose.yml file for this use case are as follows:

1.Create a `docker-compose.yml` file in the **root of your Nx monorepo**.
2.Define services for each of your projects: the two front ends, the backend, Redis, and MongoDB.
3.Set up the build context and Dockerfile for each service.
4.Define volumes for Redis and MongoDB to persist data.
5. Make sure the services can communicate with each other using their service names as hostnames (containers in the same network can resolve each other's hostnames).
6. setup bind mounts for each service to enable live reloading. This mounts will persist the changes made in the host machine node_modules & the code to the container.

Here's a basic example of what your docker-compose.yml might look like:

```yml
version: '3'

services:
  frontend:
    build:
      context: ./apps/frontend
      dockerfile: Dockerfile
    ports:
      - '4200:4200'
    volumes:
      - /apps/frontend/node_modules
      - ./:/apps/frontend:ro
    depends_on: 
        - backend
  
  admin:
    build:
      context: ./apps/admin
      dockerfile: Dockerfile
    ports:
      - '4300:4300'
    volumes:
      - /apps/admin/node_modules
      - ./:/apps/admin:ro
    depends_on: 
        - backend
  
  backend:
    build:
      context: ./apps/backend
      dockerfile: Dockerfile
    ports:
      - '3000:3000'
    volumes:
     - /apps/backend/node_modules
     - ./:/apps/backend:ro
    environment:
      REDIS_HOST: redis
      MONGO_HOST: mongodb
    links:
      - redis
      - mongodb
    depends_on: 
        - redis
        - mongodb

  redis:
    image: redis
    volumes:
      - redis-data:/data

  mongodb:
    image: mongo
    volumes:
      - mongo-data:/data/db

volumes:
  redis-data:
  mongo-data:
```

## Running the Dockerized Application

1.Open a terminal in the root of your monorepo.
2.Run `docker-compose up -d` to build and start your Dockerized services.
3.Access your front ends at <http://localhost:4200> and <http://localhost:4300>.
4.Access your backend at <http://localhost:3000>.

## Local Cleaning Up

1.Run `docker-compose down` to stop and remove the containers.
2.If you want to remove the volumes too, run `docker-compose down -v`.

## Deploying the Dockerized Application on Docker Hub

1.Create a Docker Hub account.
2.Create a new repository on Docker Hub.
3.Log in to Docker Hub from the terminal using `docker login`.
4.Build the Docker images using `docker-compose build`.
5.Tag the images using `docker tag <tag-name>:<version-no>`.
6.Push the images to Docker Hub using `docker push`.

## Exploring the Dockerized Application

1.Run `docker-compose ps` to see the status of the containers.
2.Run `docker-compose logs` to see the logs of the containers.
3.Run `docker-compose exec <service-name> <command>` to execute a command inside a container.
4.Run `docker-compose exec -it <service-name> bash` to open a bash shell inside the container.

## Development Environment Setup & Caveats

In a typical development process using Docker Compose, the applications can live reload when a developer makes changes and saves their code. This live reloading capability is achieved through volume mapping, which allows the code changes made on the host machine to be reflected immediately inside the running containers. Here's how it works:

1.Volume Mapping:
When you define volume mappings in your docker-compose.yml file, it allows the containers to share files between the host machine and the container. **This means that any changes you make to your code on the host machine will be immediately visible inside the container.**

2.Development Workflow:
During development, you'll start your Docker Compose setup using docker-compose up. When you make changes to your code on the host machine and save those changes, they will be automatically synchronized with the corresponding containers. This synchronization enables live reloading, so you can see the impact of your changes in real time without the need to manually rebuild and restart the containers.

3.Frontend and Backend Applications:
Whether you're working on frontend or backend applications, the live reloading mechanism will work similarly. The code changes you make in your editor will be picked up by the containers, triggering a rebuild or a refresh of the application as necessary.

5.Caveats:
While live reloading is a powerful feature for development, there might be situations where changes don't take effect as expected. For instance, if the change you make requires a **change in a package dependency**, you might need to **restart the container or rebuild the image**. Additionally, some frameworks and tools have specific configurations or extensions that enable more efficient live reloading, so it's a good idea to check the documentation for your specific tools.

Remember that live reloading might vary slightly based on the technology stack you're using, the tools you have set up, and the specific configurations you've made. However, the overall idea is to allow developers to see their changes without interruption, making the development process smoother and more efficient.
