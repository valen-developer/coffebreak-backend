#!/bin/sh


enviroments=("dev" "production" "local" "staging")


for env in "${enviroments[@]}"
do
  if [ -f .env.$env.gpg ]; then
    echo "Found .env.$env file"
    echo "Encoding $env"
    gpg --quiet --batch --yes --decrypt --passphrase="$ENV_PASSPHRASE" \
        --output ./.env.$env .env.$env.gpg
  else
      echo "No .env.$env file found"      
  fi

done


# --batch to prevent interactive command
# --yes to assume "yes" for questions

