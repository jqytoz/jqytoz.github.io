# Proof Card Layout Update

## What will change
- Restyle each proof entry to match the uploaded reference: receipt image above a structured details panel.
- Show the overpay prominently in a left column, with the trade title and date on the right.
- Replace the reference card's descriptive paragraph with the traded items, sender, and receiver from each proof.
- Keep the existing P–01 to P–08 images, latest marker, verification state, and mobile layout.

## Technical details
- Update the Proofs markup in `ArchiveTabs` while keeping all trade-specific content in `ITEM_TEMPLATE`.
- Update only the proof-related styles and verify the result at desktop and mobile sizes.
