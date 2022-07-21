#!/bin/sh

mkdir $HOME/secrets
mkdir $HOME/secrets/coffebreak

# --batch to prevent interactive command
# --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$ENV_PASSPHRASE" \
--output $HOME/secrets/coffebreak/.env .env.gpg