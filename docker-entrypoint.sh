#!/bin/sh
set -e

echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Starting app..."
if [ "$APP_ENV" = "local" ]; then
  exec npm run dev
else
  exec npm start
fi
