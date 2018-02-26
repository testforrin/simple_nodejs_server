# Use an official Python runtime as a parent image
FROM node:carbon

ARG BINDPORT
ARG BINDADDR

# Define environment variable
ENV BINDPORT ${BINDPORT:-8080}
ENV BINDADDR ${BINDADDR:-0.0.0.0}

# Set the working directory to /simple_nodejs_server
WORKDIR /simple_nodejs_server

# Install app dependencies
COPY package*.json simple_nodejs_server.js ./
RUN npm install && mkdir ./data

# Make binding port available to the world outside this container
EXPOSE ${BINDPORT}

# Run app when the container launches
CMD ["npm", "start"]
