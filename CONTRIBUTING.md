# Contributing to Shielded x402

This project adheres to **Zcash development standards**, particularly those outlined in [librustzcash](https://github.com/zcash/librustzcash).

## Code Style
- Follow [librustzcash style guides](https://github.com/zcash/librustzcash/blob/master/CONTRIBUTING.md).
- Use `rustfmt` for formatting.
- Prefer `clippy` for linting.

## Testing
- Unit tests: `cargo test --lib`.
- Integration tests: `cargo test --test integration`.

## Documentation
- Add examples to `docs/specs/shielded-x402.md`.
- Update `README.md` for new features.

## Reporting Issues
1. Search existing issues.
2. Open a new issue with:
   - Steps to reproduce.
   - Expected/actual behavior.
   - Environment details.

## License
MIT-licensed. See `LICENSE` for details.
