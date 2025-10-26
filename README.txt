Building the docker file 
docker build -t be-bold .

0. login 
docker login 
(the image woudlve been tagged and pushed already)

1. Pull
docker pull u23587832/be-bold:latest

2. Run
docker run -p 3000:3000 u23587832/be-bold

gitHub
https://github.com/Hannah1704/beBOLD

your details: 
username: marker 
password: markerpassword
abilities: read-only

connection string:
mongodb+srv://<db_username>:<db_password>@beboldcluster.tidjvrq.mongodb.net/?retryWrites=true&w=majority&appName=beBoldCluster