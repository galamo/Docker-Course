# Running Node.js with nginx load balancer - https

1. navigate to folder Lab_10
2. run `mkdir -p nginx/certs
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/certs/selfsigned.key \
  -out nginx/certs/selfsigned.crt \
  -subj "/C=US/ST=Dev/L=DevCity/O=DevOrg/OU=Dev/CN=localhost"
`
3. run `docker compose up --build`
