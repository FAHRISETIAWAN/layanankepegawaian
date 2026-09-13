#!/bin/bash
set -e

DOMAIN="itms.atrbpn.go.id"
EMAIL="admin@atrbpn.go.id"

echo "### Step 1: Stop semua container ..."
docker compose down

echo "### Step 2: Start Nginx dengan config HTTP-only (tanpa SSL) ..."
docker run -d --name nginx-init \
  -p 80:80 \
  -v "$(pwd)/nginx/nginx-http-only.conf:/etc/nginx/conf.d/default.conf:ro" \
  -v "$(pwd)/certbot/www:/var/www/certbot" \
  nginx:alpine

echo "### Step 3: Request sertifikat Let's Encrypt ..."
docker run --rm \
  -v "$(pwd)/certbot/www:/var/www/certbot" \
  -v "$(pwd)/certbot/conf:/etc/letsencrypt" \
  certbot/certbot certonly --webroot \
    --webroot-path=/var/www/certbot \
    --email "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    -d "$DOMAIN"

echo "### Step 4: Stop Nginx sementara ..."
docker stop nginx-init && docker rm nginx-init

echo "### Step 5: Start semua service dengan HTTPS ..."
docker compose up -d

echo ""
echo "✓ Selesai! Buka https://$DOMAIN"
