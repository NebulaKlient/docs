# Use the official Nginx Alpine image
FROM nginx:stable-alpine

# Remove the default config
RUN rm /etc/nginx/conf.d/default.conf

# Add our custom reverse-proxy config
RUN cat << 'EOF' > /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name docs.nebulaclient.zip;

    # if you ever need to serve over HTTPS directly in the container,
    # you'll need certs here; otherwise terminate TLS at Cloudflare.

    location / {
        # preserve the original path under /nebula
        proxy_pass https://nebulaclient.gitbook.io/nebula/;
        proxy_set_header Host              nebulaclient.gitbook.io;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # optional: increase timeouts if your GitBook is large
        proxy_connect_timeout       10s;
        proxy_send_timeout          30s;
        proxy_read_timeout          30s;
    }
}
EOF

# Expose HTTP
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
