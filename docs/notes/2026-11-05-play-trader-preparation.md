# Google Play terms preparation — 2026-11-05

The existing `/terms` page remains the canonical terms URL. The update removes a fixed Korean price in favor of the actual store purchase screen, provides refund/support routes, and preserves mandatory consumer rights. It adds no trader declaration or new public address/phone information.

Before publication, review the terms and align their proposed effective date (2026-11-06) with publication if delayed. After an approved deployment, verify https://warmwake.donminzzi.kr/terms against the canonical site URL in `lib/site.ts`; do not treat a local build or PR as live publication.

Play Console remains a separate task: read the existing account declaration, confirm distribution countries and actual monetization, review public contacts, and supply the existing terms URL if required. Email receipt and this patch do not establish completion or a legal trader status.

Policy reference: https://support.google.com/googleplay/android-developer/answer/17594752
