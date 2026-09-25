use x402_shielded::{SpendAgent, ShieldedPayment};
use librustzcash::primitives::zip32::ExtendedFullViewingKey;

#[test]
fn test_shielded_payment_flow() {
    let viewing_key = ExtendedFullViewingKey::master();
    let agent = SpendAgent::new(viewing_key, 1_000_000); // 1 ZEC limit

    let payment = ShieldedPayment {
        amount: 100_000, // 0.1 ZEC
        recipient: "zs1abc123...".to_string(),
        expiry: "2024-12-31T23:59:59Z".to_string(),
        metadata: None,
    };

    let tx = agent.authorize_tx(&payment).unwrap();
    assert!(tx.is_valid());
}