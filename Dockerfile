FROM caddy:2-builder AS builder

RUN xcaddy build \
    --with github.com/caddyserver/replace-response

FROM caddy:2-alpine

COPY --from=builder /usr/bin/caddy /usr/bin/caddy

RUN <<'EOF' cat > /etc/caddy/Caddyfile
docs.nebulaclient.zip:3587 {
    route {
        replace_response {
            content_type text/plain text/html text/css application/javascript application/json
            search_replace "nebulaclient.gitbook.io" "docs.nebulaclient.zip"
            search_replace "/nebula/" "/"
        }

        rewrite * /nebula{path}

        reverse_proxy https://nebulaclient.gitbook.io {
            header_up Host "nebulaclient.gitbook.io"
            header_up Accept-Encoding ""
            header_up X-Real-IP "{remote_host}"
            header_up X-Forwarded-For "{remote_host}"
            header_up X-Forwarded-Proto "{scheme}"
        }
    }
}
EOF

EXPOSE 3587
