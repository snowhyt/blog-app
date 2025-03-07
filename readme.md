

---HELPFUL COMMANDS FOR POSTGRES IN DOCKER (for this project **personal use only**)---
<!-- # docker ps - is like listing running containers
#   \l[+]   [PATTERN]      list databases
# \d
#   \ds[S+] [PATTERN]      list sequences
#   \dt[S+] [PATTERN]      list tables
#   \dT[S+] [PATTERN]      list data types
#   \du[S+] [PATTERN]      list roles
#   \dv[S+] [PATTERN]      list views

# docker-compose up -d = starts the containers and runs the database
# docker-compose up --build = starts the containers and runs the database, but also builds the images first
# docker-compose down = If you want to stop and remove containers but keep database data, logs, and other persistent volumes.
# docker-compose down -v = sIf you want a clean reset of everything, including database storage, logs, and other persistent data.
# docker-compose ps = lists running containers
# docker-compose logs = lists logs of running containers
# docker-compose stop = stops running containers
# docker-compose restart = restarts running containers
# docker-compose down --remove-orphans = removes all containers that are not running
# docker-compose down --rmi all = removes all images
# docker volume rm blog-app-db-1 = remove volume //with database name
# docker-compose down --volumes = removes all volumes
# docker exec -it blog-app-db-1 psql -U postgres -d blog-db = connect to database
# docker exec -it blog-app-db-1 psql -U postgres -d blog-db -c "TYPE YOUR QUERY HERE" = execute query -->


------------------- HHTPS STATUS CODES  ----------------------------
200  (Success/OK) 

301 (Permanent Redirect)

302 (Temporary Redirect)

304 (Not Modified)

400 (Bad Request)

401 (Unauthorized Error)

403 (Forbidden)

404 (Not Found)

500 (Internal Server Error)

501 (Not Implemented)