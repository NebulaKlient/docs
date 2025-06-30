FROM nginx:stable-alpine

RUN rm /etc/nginx/conf.d/default.conf

RUN <<'EOF' cat > /etc/nginx/conf.d/default.conf
server {
    listen 3587;
    server_name docs.nebulaclient.zip;

    resolver 8.8.8.8;

    location / {
        proxy_pass https://nebulaclient.gitbook.io/nebula/;
        proxy_ssl_server_name on;
        proxy_set_header Host              nebulaclient.gitbook.io;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout       10s;
        proxy_send_timeout          30s;
        proxy_read_timeout          30s;
    }
}
EOF

EXPOSE 3587

CMD ["nginx", "-g", "daemon off;"]
