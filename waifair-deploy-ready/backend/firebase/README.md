# Firebase backend work area

The existing Firebase client configuration and browser-side service modules remain in `src/services/` to preserve the current application imports.

Before production:
- Rewrite `firestore.rules` using authenticated UID ownership and role claims.
- Add Storage rules.
- Test rules with Firebase Emulator Suite.
- Implement privileged operations in Firebase Cloud Functions (or a protected server API).
- Never put Admin SDK credentials or private secrets in the frontend.

The current `firestore.rules` is permissive and must not be deployed to production as-is. No Cloud Functions backend is included yet.
