# UI
FROM node:16-alpine
 
WORKDIR .
 
COPY ui/package*.json .
 
RUN npm install
 
COPY ui/ .
 
EXPOSE 3000

CMD ["npm","start"]
