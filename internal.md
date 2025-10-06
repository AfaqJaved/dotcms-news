## Docker image Pushed 


### to build for platform
docker buildx build --platform linux/amd64 -t registry.afaqjaved.com/dotcms-assignment/app:latest  --no-cache .
docker tag registry.afaqjaved.com/dotcms-assignment/app:latest registry.afaqjaved.com/dotcms-assignment/app:latest
docker push registry.afaqjaved.com/dotcms-assignment/app:latest



