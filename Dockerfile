FROM caddy:2-alpine

RUN <<'EOF' cat > /etc/caddy/Caddyfile
:3587 {
    reverse_proxy https://nebulaclient.gitbook.io {
        header_up Host nebulaclient.gitbook.io
        header_up X-Real-IP {remote_host}
        header_up X-Forwarded-For {remote_host}
        header_up X-Forwarded-Proto {scheme}
        rewrite * /nebula{uri}
    }
    
    header {
        -Server
        -X-Powered-By
    }
    
    handle_response {
        @html header Content-Type text/html*
        replace @html {
            nebulaclient.gitbook.io docs.nebulaclient.zip
            /nebula/ /
            "/nebula" "/"
            '/nebula' '/'
        }
        
        @css header Content-Type text/css*
        replace @css {
            nebulaclient.gitbook.io docs.nebulaclient.zip
            /nebula/ /
        }
        
        @js header Content-Type application/javascript*
        replace @js {
            nebulaclient.gitbook.io docs.nebulaclient.zip
            /nebula/ /
            "/nebula" "/"
            '/nebula' '/'
        }
        
        @json header Content-Type application/json*
        replace @json {
            nebulaclient.gitbook.io docs.nebulaclient.zip
            /nebula/ /
            "/nebula" "/"
        }
    }
    
    redir /nebula /
    redir /nebula/* /{uri.path.1}
}
EOF

EXPOSE 3587
