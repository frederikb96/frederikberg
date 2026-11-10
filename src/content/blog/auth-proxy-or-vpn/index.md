---
title: "An authenticating proxy or a VPN in front of self-hosted web apps?"
description: >-
  A comparison of two ways to protect self-hosted web applications: a VPN such as WireGuard, which
  hides the services from the internet, and an authenticating reverse proxy with single sign-on, which
  leaves them reachable but checks every request. What each exposes, where each fails, and when to
  combine them.
date: 2026-11-04
lang: en
kind: research
summary: >-
  A VPN hides services completely and protects any protocol; an authenticating proxy leaves them
  reachable but checks every HTTP request against a central login, with per-app access and a full
  audit trail. For web apps a well-configured proxy is enough; admin interfaces are worth both.
tags: [self-hosting, security, authentication]
disclaimer: core
ail: 4
---

<div class="tldr">

In short

- **A VPN hides the services.** They cannot be reached at all without being on the VPN, whatever the protocol. Unless it is set up with rules per service, whoever is on it can reach everything.
- **An authenticating proxy checks every request.** The services can be found, but no request reaches them without a valid login, and access can be granted per app and per person.
- **For web apps used by a small group, a well-maintained proxy is enough.** For anything that is not HTTP, the VPN is the right tool.
- **For admin interfaces, use both.** The VPN keeps them out of sight, and the proxy still decides who may use them.

</div>

Anyone who hosts web applications at home or on a rented server has to decide how they are protected from the internet. Two patterns are common. One puts the services behind a VPN. The other publishes them through a reverse proxy that requires a login with a central identity provider before any request reaches the application, in a self-hosted setup for example OAuth2-Proxy in front of an OpenID Connect provider such as Zitadel. This article answers three questions:

- What does each of the two expose to the internet?
- What does each do better, and where does each stop?
- When is one enough, and when is it worth combining them?

## 1. What each one exposes

The two work at different layers and therefore hide different things:

- **A VPN works at the network.** Services behind it have no public address. By default access is all or nothing: whoever is on the network can reach every service on it, unless the VPN is configured with rules per device and service.
- **An authenticating proxy works at the application.** The services can be found by name and connected to, but no request reaches them without a valid session.

A WireGuard server does not even answer a client it does not know: "the server does not even respond at all to an unauthorized client; it is silent and invisible" [\[1\]](https://www.wireguard.com/protocol/). An attacker first has to compromise the VPN itself or a device connected to it.

The proxy check runs on every HTTP request, not once at login. With the Traefik reverse proxy, the ForwardAuth middleware "delegates authentication to an external service. If the service answers with a 2XX code, access is granted, and the original request is performed. Otherwise, the response from the authentication server is returned" [\[2\]](https://doc.traefik.io/traefik/reference/routing-configuration/http/middlewares/forwardauth/). OAuth2-Proxy's endpoint for this purpose answers only allow or deny: it "only returns a 202 Accepted response or a 401 Unauthorized response" [\[3\]](https://oauth2-proxy.github.io/oauth2-proxy/features/endpoints/).

## 2. What each does better

Each covers ground the other cannot:

- **The proxy grants access per app and per person.** A stolen login for one application does not open the others, two-factor login can be required per application, the logs record who opened what, and a browser is all a user needs.
- **The VPN covers every protocol.** SSH, databases and anything else, while the proxy only covers HTTP.
- **The VPN keeps the services out of scans** and removes the proxy itself as something to attack.

The proxy's model matches what NIST describes as zero trust: "Zero trust assumes there is no implicit trust granted to assets or user accounts based solely on their physical or network location" [\[4\]](https://csrc.nist.gov/pubs/sp/800/207/final). A VPN grants exactly that kind of location-based trust once a device is connected.

The proxy as an attack surface is real. OAuth2-Proxy up to version 7.10.0 contained a critical authentication bypass in which attackers could get past the `skip_auth_routes` rules "by crafting URLs with query parameters that satisfy the configured regex patterns" (CVE-2025-54576) [\[5\]](https://github.com/oauth2-proxy/oauth2-proxy/security/advisories/GHSA-7rh7-c77v-6434). VPN software can have flaws too, but a proxy in front of public services is reachable by everyone, so a flaw in it is too.

## 3. Where the proxy's check stops

The per-request check has two edges, both following from where the check sits rather than from a bug:

- **Long-lived connections are checked once.** A WebSocket or event stream is opened by one request and then stays open, so the session is checked when the connection starts, not for each message.
- **A stolen session cookie works at the proxy too.** A flaw in one of the applications behind it that lets an attacker run script in the browser (cross-site scripting) can leak the cookie.

Both are reasons to keep sessions short and revocable on the server.

## 4. The counter-argument

The strongest case for a VPN-only setup is that an exposed login is a target and a hidden service is not. That is true, and it is why the common advice to never expose internal tools exists. The advice is mostly aimed at applications with no authentication or weak authentication of their own, though. With a maintained proxy, a central identity provider, sessions held on the server and two-factor login, the remaining difference is the proxy's own attack surface. It is larger than a WireGuard server's, because the proxy answers requests from anyone while the VPN stays silent, and that is the price for per-app access without a client.

## 5. Assessment

For web applications used by a small group, an authenticating proxy with a central identity provider is a sound choice on its own, as long as the proxy is kept current and its bypass rules stay minimal. A VPN is the better tool for anything that is not HTTP. For administrative interfaces whose compromise would be serious, combining both is cheap: the VPN keeps the interface out of sight, and the proxy still decides who may use it once someone is on the network.

## References

1. WireGuard. *Protocol & Cryptography.* https://www.wireguard.com/protocol/
2. Traefik Labs. *ForwardAuth middleware*, Traefik documentation. https://doc.traefik.io/traefik/reference/routing-configuration/http/middlewares/forwardauth/
3. OAuth2 Proxy. *Endpoints*, documentation. https://oauth2-proxy.github.io/oauth2-proxy/features/endpoints/
4. Rose, S. et al. *Zero Trust Architecture.* NIST Special Publication 800-207, 2020. https://csrc.nist.gov/pubs/sp/800/207/final
5. OAuth2 Proxy. *Security advisory GHSA-7rh7-c77v-6434, CVE-2025-54576.* https://github.com/oauth2-proxy/oauth2-proxy/security/advisories/GHSA-7rh7-c77v-6434
