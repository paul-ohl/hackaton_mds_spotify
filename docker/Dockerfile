FROM node:22-alpine

WORKDIR /app
COPY ./src/musicalendar/package.json ./
RUN npm set strict-ssl false
RUN npm install
# COPY ./src/musicalendar .

ENV TZ=Europe/Paris

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["npm", "run", "dev"]
