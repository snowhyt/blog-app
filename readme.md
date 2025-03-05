---USEFUL COMMANDS FOR POSTGRES IN DOCKER (for this project **personal use only**)---
docker ps
\l
\d
\dt
docker volume rm blog-app-db-1
docker exec -it blog-app-db-1 psql -U postgres -d blog-db