#!/bin/sh

# array of string called enviroments with "dev" and "production"
enviroments=("dev" "production" "local" "staging")

for env in "${enviroments[@]}"
do
  echo "Encoding $env"
  gpg  --passphrase="$ENV_PASSPHRASE" --batch --yes  --symmetric --cipher-algo AES256 .env.$env
done
