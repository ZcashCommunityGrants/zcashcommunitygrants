---
layout: post
title: "Zebra Native Non-Custodial Mining Stack"
date: 2026-09-22 12:00:00 +0000
categories: ["Zcash", "Mining"]
tags: ["Zebra", "pool", "lightwalletd", "shielded-pool"]
author: "Zcash Community Grants"
---

The **Zebra Native Non-Custodial Mining Stack** is a comprehensive, end‑to‑end solution for miners who want to operate a Zcash pool without custodial risk. It brings together:

* **Zebra Pool Engine** – a high‑performance, Rust‑based pool backend that supports both transparent and shielded transactions.
* **Test Harness** – a lightweight framework for validating pool logic, ensuring correctness before deployment.
* **Lightwalletd Integration** – a streamlined interface to the Zcash network, enabling fast block and transaction queries.
* **Shielded‑Pool Telemetry** – real‑time metrics and diagnostics for shielded transaction processing, helping operators monitor performance and detect anomalies.

## Key Features

| Feature | Description |
|---------|-------------|
| **Non‑custodial** | Miners retain full control over their private keys and funds. |
| **Rust‑based** | Leverages Rust’s safety and performance for low‑latency operation. |
| **Modular** | Each component can be deployed independently or as a single stack. |
| **Telemetry** | Built‑in Prometheus metrics for shielded‑pool health and throughput. |
| **Lightwalletd** | Minimal dependency on full nodes, reducing infrastructure costs. |

## Getting Started

1. **Clone the repository**  
   