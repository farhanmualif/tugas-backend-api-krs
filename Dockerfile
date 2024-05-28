# Gunakan image Node.js sebagai base image
FROM node:alpine
# Install all the dependencies in the container using the package.json file
COPY package*.json .

COPY .env .
RUN npm install
 
# Copy the remaining project files to the container
COPY . .
 
# Expose the application port
EXPOSE 3000
 
# Run the App
CMD npm start