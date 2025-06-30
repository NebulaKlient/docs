FROM traefik:v3.0

RUN <<'EOF' cat > /etc/traefik/traefik.yml
api:
  dashboard: false
  insecure: false

entryPoints:
  web:
    address: ":3587"

providers:
  file:
    filename: /etc/traefik/dynamic.yml

log:
  level: ERROR
EOF

RUN <<'EOF' cat > /etc/traefik/dynamic.yml
http:
  routers:
    gitbook:
      rule: "PathPrefix(`/`)"
      service: gitbook-service
      entryPoints:
        - web
      middlewares:
        - rewrite-path
        - headers

  middlewares:
    rewrite-path:
      replacePathRegex:
        regex: "^/nebula(.*)$"
        replacement: "$1"
    headers:
      headers:
        customRequestHeaders:
          Host: "nebulaclient.gitbook.io"
          X-Forwarded-Host: "docs.nebulaclient.zip"
        customResponseHeaders:
          Content-Security-Policy: ""

  services:
    gitbook-service:
      loadBalancer:
        servers:
          - url: "https://nebulaclient.gitbook.io/nebula/"
EOF

EXPOSE 3587
