---
layout: post
title:  "Setting up proxy servers in Kubernetes"
date:   2025-03-29 02:24:00 +0300
categories: kubernetes networking
tags: kubernetes go networking proxy
---

<div id="table-of-contents" class="toc-container">
  <h2>Table of Contents</h2>
  <ul>
    <li><a href="#overview">Overview</a></li>
    <li>
      <a href="#challenges">Challenges</a>
      <ul>
        <li><a href="#proxy-fragmentation">Proxy Fragmentation</a></li>
        <li><a href="#containerization-complexity">Containerization Complexity</a></li>
        <li><a href="#development-challenges">Development Challenges</a></li>
      </ul>
    </li>
    <li>
      <a href="#implementation">Implementation</a>
      <ul>
        <li><a href="#http-connect-forward-proxy">HTTP CONNECT Forward Proxy</a></li>
        <li><a href="#http-proxy-with-mitm">HTTP Proxy with Man-in-the-Middle</a></li>
        <li><a href="#zero-trust-networking">Zero-Trust Networking with mTLS Proxy</a></li>
      </ul>
    </li>
    <li><a href="#conclusion">Conclusion</a></li>
  </ul>
</div>

<div id="overview"></div>
## Overview

In enterprise and highly regulated industries such as finance, healthcare, insurance, federal, and government sectors, all outbound (egress) traffic typically needs to go through a proxy server. This requirement exists for various reasons including compliance, governance, security, and caching. Organizations implement different proxy setups depending on their specific needs and security requirements. The three main proxy configurations commonly used are:

1. **HTTP CONNECT forward proxy**: A simple proxy that forwards HTTP(S) traffic without intercepting it, creating a tunnel between the client and the target.

2. **HTTP proxy with man-in-the-middle (MITM)**: Also known as TLS inspection, SSL bumping, or Deep Packet Inspection, this setup intercepts encrypted traffic to inspect its contents before forwarding it to the destination.

3. **Zero-trust networking with mTLS Proxy**: Uses mutual TLS (mTLS) authentication where both the client and server authenticate each other using certificates, providing an additional layer of security in zero-trust environments.

<div id="challenges"></div>
## Challenges

Setting up proxy servers in Kubernetes environments presents several challenges:

<div id="proxy-fragmentation"></div>
### Proxy Fragmentation

The proxy server landscape is fragmented with various solutions like Zscaler, Squid, Fortinet, and others. Each has its own configuration requirements, authentication methods, and capabilities. This fragmentation makes it difficult to create a standardized approach for applications running in Kubernetes.

<div id="containerization-complexity"></div>
### Containerization Complexity

Containerizing proxy servers for development and debugging purposes can be challenging due to:

1. **Certificate Management**: Especially for HTTPS interception or mTLS, managing certificates within containers requires careful consideration.

2. **Network Configuration**: Ensuring proper network routing and DNS resolution within the Kubernetes cluster.

3. **Authentication**: Implementing proper authentication mechanisms, particularly for enterprise proxies.

4. **Debugging**: When things go wrong, identifying whether the issue is in the proxy configuration, the client application, or the network can be difficult.

<div id="development-challenges"></div>
### Development Challenges

Developers often face challenges when working with proxies in Kubernetes:

1. **Local Development**: Replicating production proxy setups in local development environments.

2. **Testing**: Ensuring applications correctly handle proxy configurations and authentication.

3. **Troubleshooting**: Diagnosing connectivity issues when traffic must flow through proxies.

<div id="implementation"></div>
## Implementation

Let's explore three different implementations for proxy servers in Kubernetes, each serving different use cases:

<div id="http-connect-forward-proxy"></div>
### 1. HTTP CONNECT Forward Proxy

[k8s-http-proxy](https://github.com/ofirc/k8s-http-proxy/) provides a simple tinyproxy blueprint for forwarding HTTP(S) traffic from applications running in Kubernetes. This type of proxy doesn't intercept the traffic but instead sets up a tunnel between the client and the target.

**When to use it:**
- When you need simple HTTP(S) forwarding without traffic inspection
- For basic compliance requirements where traffic logging is sufficient
- When performance is a priority, as it adds minimal overhead

**Implementation steps:**
```bash
# Create a local cluster (optional)
kind create cluster --name test-proxy

# Deploy the proxy
git clone https://github.com/ofirc/k8s-http-proxy/
cd k8s-http-proxy
kubectl apply -f deploy/
kubectl wait --for=condition=Available deployment/proxy-server

# Test the proxy
kubectl run curl --image=curlimages/curl -- sleep infinity
kubectl wait --for=condition=Ready pod/curl --timeout=150s
kubectl exec -it curl -- sh
export https_proxy=http://proxy-server.default.svc:8888
curl https://example.com
```

<div id="http-proxy-with-mitm"></div>
### 2. HTTP Proxy with Man-in-the-Middle (MITM)

[k8s-sniff-https](https://github.com/ofirc/k8s-sniff-https/) provides a mitmproxy blueprint to intercept HTTPS traffic from applications running in Kubernetes. This setup allows for deep packet inspection and is useful for debugging or security monitoring.

**When to use it:**
- When you need to inspect encrypted traffic
- For debugging API calls or troubleshooting HTTPS issues
- For security monitoring and threat detection

**Implementation steps:**
```bash
# Clone the repository
git clone https://github.com/ofirc/k8s-sniff-https/
cd k8s-sniff-https

# Deploy mitmweb
kubectl apply -f deploy/mitmweb-deploy.yaml
kubectl apply -f deploy/mitmweb-service.yaml

# Pull the CA bundle from the mitmweb Pod
POD_NAME=$(kubectl get pod -l app=mitmweb -o=name | cut -d/ -f2)
CA_BUNDLE=/root/.mitmproxy/mitmproxy-ca-cert.pem

# Distribute the CA bundle to your workload Pod
kubectl cp $POD_NAME:$CA_BUNDLE ./mitmproxy-ca-cert.pem

# Access the mitmweb UI console
kubectl port-forward svc/mitmweb 8081:8081

# Test with an ephemeral Pod
kubectl run curl --image=curlimages/curl -- sleep infinity
kubectl cp ./mitmproxy-ca-cert.pem curl:/home/curl_user/mitmproxy-ca-cert.pem
kubectl exec -it curl -- sh
curl --cacert mitmproxy-ca-cert.pem -x http://mitmweb:8080 https://example.com
```

<div id="zero-trust-networking"></div>
### 3. Zero-Trust Networking with mTLS Proxy

[go-mtls-proxy](https://github.com/ofirc/go-mtls-proxy/) provides a simple mTLS proxy using tinyproxy and stunnel (without TLS inspection) along with a Go client program that uses the proxy. This setup demonstrates how to use client certificates for authentication to a proxy server.

**When to use it:**
- In zero-trust environments where mutual authentication is required
- When you need to ensure that only authorized clients can use the proxy
- For highly secure environments with strict access controls

**Implementation steps:**
```bash
# Clone the repository
git clone https://github.com/ofirc/go-mtls-proxy/
cd go-mtls-proxy

# Generate certificates and build container images
./scripts/generate-certs.sh
docker compose build

# Deploy to Kubernetes
kubectl apply -f deploy

# Copy certificates from the Pod
POD_NAME=$(kubectl get pod -o=name -lapp=stunnel | cut -d/ -f2)
kubectl cp $POD_NAME:/client-certs/ca.crt ca.crt
kubectl cp $POD_NAME:/client-certs/client.crt client.crt
kubectl cp $POD_NAME:/client-certs/client.key client.key

# Port forward the stunnel
kubectl port-forward svc/stunnel 8080

# Use the Go client or curl with the certificates
go run main.go
# or
curl \
  --proxy https://localhost:8080 \
  --proxy-cacert ca.crt \
  --proxy-cert client.crt \
  --proxy-key client.key \
  https://ipv4.icanhazip.com
```

<div id="conclusion"></div>
## Conclusion

Setting up proxy servers in Kubernetes environments is essential for organizations with strict security and compliance requirements. The three implementations discussed in this post offer different approaches based on specific needs:

1. **HTTP CONNECT forward proxy** provides a simple, performant solution for basic proxy requirements without traffic inspection.

2. **HTTP proxy with MITM** enables deep packet inspection for debugging, security monitoring, and compliance purposes.

3. **Zero-trust networking with mTLS Proxy** offers enhanced security through mutual authentication, ideal for highly regulated environments.

By understanding these different proxy setups and their implementations, developers and operations teams can better navigate the challenges of managing outbound traffic in Kubernetes environments. The provided example repositories serve as valuable starting points for implementing these solutions in your own infrastructure.

Whether you're dealing with compliance requirements, debugging encrypted traffic, or implementing zero-trust security, having a solid understanding of proxy server options in Kubernetes will help you build more secure and compliant applications.

<div id="tags"></div>
## Hashtags

#kubernetes #go #networking #proxy
