# Shielded x402 Specification

## Overview
A protocol extension for [x402](https://x402.org) enabling private machine payments using shielded ZEC. Compatible with existing x402 infrastructure while preserving transaction privacy.

## Core Components
1. **402 Response Format**: Extends x402 with shielded payment details.
2. **Spend Control**: Zero-dependency library for agentic spend authorization.
3. **Settlement**: Direct shielded ZEC transfers via x402 flows.

## Protocol Flow
1. Agent requests paywalled endpoint → receives 402 with shielded payment details.
2. Agent constructs shielded transaction using spend-control logic.
3. Transaction broadcasted → agent proceeds upon confirmation.

## Example 402 Response
```json
{
  "status": 402,
  "payment": {
    "type": "shielded-x402",
    "amount": "1.00000000",
    "recipient": "zs1...",
    "expiry": "2024-12-31T23:59:59Z",
    "metadata": "optional-opaque-data"
  }
}
```

## Spend Control
- **Library**: `x402-shielded` (MIT-licensed).
- **Features**:
  - Pre-authorized spend limits.
  - Shielded address derivation.
  - Transaction batching.

## Compliance
- Adheres to [Zcash development standards](https://github.com/zcash/librustzcash).
- No KYC requirements for amounts ≤ $50,000 USD.

## References
- [x402 Specification](https://x402.org/spec)
- [librustzcash Style Guide](https://github.com/zcash/librustzcash/blob/master/CONTRIBUTING.md)