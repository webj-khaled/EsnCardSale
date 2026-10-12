# ESN Card Sale

React, TypeScript, and Vite storefront for ESN card orders, with Stripe payments and Supabase storage.

## Local development

1. Run `npm ci`.
2. Create a local `.env` file with `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `VITE_STRIPE_PUBLISHABLE_KEY`. Keep this file out of Git.
3. Run `npm run dev`.

Use `npm run build` for a production build and `npx tsc --noEmit` to check TypeScript.

## Required document

Orders require an acceptance letter or learning agreement. The form does not request or upload an ID or passport, and new order inserts omit `id_card_path`.

Before deploying against an existing Supabase database, apply `supabase/migrations/20261012000000_make_id_card_path_optional.sql` through the Supabase SQL editor or your migration workflow. It allows new orders without an ID document if the old column was required, while preserving historical records.
