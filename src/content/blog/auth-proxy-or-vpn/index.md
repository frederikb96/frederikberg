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
---

Anyone who hosts web applications at home or on a rented server has to decide how they are protected from the internet. Two patterns are common. One puts the services behind a VPN, so only devices on the VPN can reach them at all. The other publishes them through a reverse proxy that requires a login with a central identity provider before any request reaches the application, in a self-hosted setup for example OAuth2-Proxy in front of an OpenID Connect provider such as Zitadel. The common advice to "never expose internal tools" suggests the VPN is always the safer choice. The two actually expose different things, and which one is right depends on what is being protected.

## What each one exposes

A VPN works at the network layer. Services behind it have no public address, and a WireGuard server does not even answer a client it does not know: "the server does not even respond at all to an unauthorized client; it is silent and invisible" (https://www.wireguard.com/protocol/). An attacker first has to compromise the VPN itself or a device that is connected to it. Access is binary, though: whoever is on the network can reach every service on it, whatever the protocol.

An authenticating proxy works at the application layer. The services can be found by name and connected to, but no request reaches them without a valid session. With Traefik, the ForwardAuth middleware "delegates authentication to an external service. If the service answers with a 2XX code, access is granted, and the original request is performed. Otherwise, the response from the authentication server is returned" (https://doc.traefik.io/traefik/reference/routing-configuration/http/middlewares/forwardauth/). OAuth2-Proxy's endpoint for this purpose "only returns a 202 Accepted response or a 401 Unauthorized response" (https://oauth2-proxy.github.io/oauth2-proxy/features/endpoints/). The check runs for every HTTP request, not once at login.

## What the proxy does better

Because every request passes through one identity provider, access can be granted per application and per user rather than for the whole network. A stolen login for one application does not open the others, multi-factor authentication can be required per application, and the logs record who opened what. Nothing has to be installed on the client; a browser is enough. This matches what NIST's zero-trust architecture describes: "Zero trust assumes there is no implicit trust granted to assets or user accounts based solely on their physical or network location" (https://csrc.nist.gov/pubs/sp/800/207/final). A VPN grants exactly that kind of location-based trust once a device is connected.

## What the VPN does better

The VPN protects things the proxy cannot. It covers SSH, databases and any other protocol, while the proxy only covers HTTP. It keeps the services out of scans and reconnaissance entirely. And it removes the proxy itself as an attack surface. That surface is real: OAuth2-Proxy up to version 7.10.0 contained a critical authentication bypass in which attackers could pass the `skip_auth_routes` rules "by crafting URLs with query parameters that satisfy the configured regex patterns" (CVE-2025-54576, https://github.com/oauth2-proxy/oauth2-proxy/security/advisories/GHSA-7rh7-c77v-6434). VPN software has its own vulnerabilities, but a proxy in front of public services is reachable by everyone, so a flaw in it is reachable by everyone too.

## Where the proxy's check stops

The per-request check covers HTTP requests. A long-lived WebSocket or event-stream connection is opened by one request and then stays open, so the session is checked when the connection starts and not for each message on it. A session cookie stolen through a cross-site scripting flaw in one of the applications behind the proxy is also valid for the proxy. Both follow from where the check sits rather than from a bug, and both are reasons to keep sessions short and revocable on the server.

## The counter-argument

The strongest case for a VPN-only setup is that an exposed login is a target and a hidden service is not. That is true, and it is the reason the advice to never expose internal tools exists. It is mostly aimed at applications with no authentication or weak authentication of their own, though. With a maintained proxy, a central identity provider, server-side sessions and multi-factor authentication, the remaining difference is the proxy's own attack surface, which is the same kind of risk a VPN server carries.

## What follows

For web applications used by a small group, an authenticating proxy with a central identity provider is a sound choice on its own, as long as the proxy is kept current and its bypass rules stay minimal. A VPN is the better tool for anything that is not HTTP. For administrative interfaces whose compromise would be serious, combining both is cheap: the VPN keeps the interface out of sight, and the proxy still decides who may use it once someone is on the network.
