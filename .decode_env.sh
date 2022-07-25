#!/bin/sh


# --batch to prevent interactive command
# --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$ENV_PASSPHRASE" \
--output ./.env .env.gpg
