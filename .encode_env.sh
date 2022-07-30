#!/bin/sh

# array of string called enviroments with "dev" and "production"
enviroments=("dev" "production" "local" "staging")



for env in "${enviroments[@]}"
do
  if [ -f .env.$env ]; then
    echo "Found .env.$env file"
    echo "Encoding $env"
    gpg  --passphrase="$ENV_PASSPHRASE" --batch --yes  --symmetric --cipher-algo AES256 .env.$env
  else
      echo "No .env.$env file found"      
  fi

done
