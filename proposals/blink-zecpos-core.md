# Grant Proposal: Zcash Privacy Payment Rail & NFC Programmable Cards (Blink)

## Status: Pending Review

### Project Overview
Blink proposes to build **ZecPOS Core**, an open-source shielded payment rail enabling merchants to accept native shielded ZEC through checkout and POS systems, with optional fiat settlement.

### Team
- **Project Lead:** Ebube Ebuka Onuora (CEO/Founder)
- **CTO:** Jethro Adamu
- **Lead Software Engineer:** Eleazar Musa
- **Organization:** Blink

### Financial Request
- **Total Budget:** $150,000 USD
- **Startup Funding:** $50,000 USD
- **Hardware/Software Costs:** $10,000 USD
- **Service Costs:** $20,000 USD
- **Compensation:** $120,000 USD

### Technical Deliverables
1. **zec-watcher**: Rust-based payment detection and monitoring.
2. **zec-checkout-sdk**: TypeScript SDK for invoice and QR management.
3. **zec-pos-kit**: React Native POS application for Android.
4. **zec-disclose**: Tooling for selective disclosure and reporting.
5. **zec-tapcard**: NFC infrastructure using NTAG 424 DNA.
6. **Deployment Kit**: Docker/Terraform for self-hosting.

### Milestones

#### Milestone 1: Core Payment Rail (Startup Funding)
- **Expected Completion:** 2026-11-15
- **Key Deliverables:** `zec-watcher`, `zec-checkout-sdk`, lightwalletd integration, ZIP-321 support.
- **Success Criteria:** Test merchant can generate invoice and receive shielded ZEC payment.

#### Milestone 2: Settlement & Disclosure ($50,000)
- **Expected Completion:** 2026-12-15
- **Key Deliverables:** `zec-pos-kit`, Treasury settlement engine (ZEC-to-USDC via NEAR), `zec-disclose`.
- **Success Criteria:** Merchant can configure ZEC retention and generate local revenue reports.

#### Milestone 3: NFC & Open Source Release ($50,000)
- **Expected Completion:** 2027-01-15
- **Key Deliverables:** `zec-tapcard` (NTAG 424 DNA), full developer documentation, MIT/Apache-2.0 release.
- **Success Criteria:** Working NFC tap payment and fully deployable self-hosted stack.

### Risks & Mitigations
- **Complexity of Shielded Pool:** Mitigated by using `lightwalletd` and rigorous reorg handling in `zec-watcher`.
- **Key Security:** Mitigated by separation of Watcher (viewing) and Signing services with KMS protection.
- **Liquidity:** Mitigated by aggregated treasury swaps and slippage thresholds.

### Supporting Links
- [Architecture](https://app.notion.com/p/Zcash-Privacy-Payment-Rail-Blink-NFC-Programmable-Cards-3e33415dce1180899b2de92d19f26ffc)
- [Website](https://useblinkapp.com)
