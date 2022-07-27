#!/bin/sh

 gpg  --passphrase="$ENV_PASSPHRASE" --batch --yes  --symmetric --cipher-algo AES256 .env