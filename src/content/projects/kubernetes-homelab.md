---
title: Kubernetes homelab on Hetzner
status: active
pitch: Three Hetzner servers on Talos Linux, managed by Flux, with replicated storage, apps for family and friends, and Borg backups. Every change goes through git.
links:
  - label: kube-borg-backup
    url: https://github.com/frederikb96/kube-borg-backup
  - label: ECK on Talos
    url: https://github.com/frederikb96/eck-on-talos
image: ../../assets/art/ledger.jpg
image_alt: A person at a desk with a large open ledger, a lookout tower seen through the window
order: 4
date: 2025-01-01
---

Everything I host runs on this cluster: the cloud storage and photo library my family uses, a password manager, a recipe app, my mail client, this website, the Elastic stack of my [homelab SOC](/projects/homelab-soc/) and the VM that my [personal AI infrastructure](/projects/personal-ai/) runs on. Most of these apps ran with Docker Compose before I moved them here.

## Three nodes, no SSH

The cluster is three Hetzner dedicated servers. Each one is control plane and worker at the same time, so one node can be down and everything keeps running. They run [Talos Linux](https://www.talos.dev/), which has no shell, no SSH and no package manager: the machine configuration is a YAML file, and every change goes through Talos' API. Cilium does the networking, a Hetzner load balancer forwards public traffic to Traefik, and the nodes talk to each other over a private network. Logins for the apps go through Zitadel as single sign-on.

## Git is the interface

Nothing is changed by hand. Flux applies everything under one folder of a git repository to the cluster, and Terraform covers what lives outside it: the Talos configuration of the nodes, the load balancer, DNS, the single sign-on setup and the public status page. CI applies Terraform when a pull request is merged. Renovate opens a pull request for every new version of a chart or an image, and an agent reads the release notes, merges what is safe and checks the cluster afterwards.

## Storage and backups

Storage comes in three tiers, chosen by one question: does the app copy its data across nodes itself?

- **Yes**, like the Postgres clusters run by CloudNativePG or Elasticsearch: a local, encrypted ZFS volume on each node's NVMe, fast, and the app keeps the copies.
- **No**, which is most apps: a Mayastor volume, replicated over two nodes' NVMe.
- **Large media**, the photo library and the cloud storage: Mayastor on hard disks.

Backups are snapshots of the volumes, shipped to an offsite Borg repository. For that I wrote [kube-borg-backup](https://github.com/frederikb96/kube-borg-backup): it snapshots all volumes of an app at once, with hooks that put the database into a consistent state, clones the snapshots and sends them to Borg. It is installed per app as a Helm chart.

## Elastic on the same nodes

The Elastic stack runs inside the cluster through the ECK operator, three Elasticsearch nodes next to the apps they watch, with older data frozen as snapshots in object storage. How to set that up on Talos from scratch is written down as a public guide, [ECK on Talos](https://github.com/frederikb96/eck-on-talos).
