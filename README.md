# KC Home Water website

Marketing site for KC Home Water (d/b/a of Whole Home Water LLC). Next.js + shadcn/ui, deployed on Vercel.

## Develop

```bash
npm install
npm run dev   # http://localhost:3000
```

## Where things live

- `src/lib/site.ts` - phone, email, domain, service-area cities, quote form options
- `src/components/site/` - one file per page section (hero, systems, FAQ, quote form, ...)
- `src/components/ui/` - shadcn/ui components (add more with `npx shadcn@latest add <name>`)
- `src/app/actions.ts` - quote form handler (emails each request via Resend)

Search for `TODO` to find placeholder content that still needs confirming.

## Quote form email

Set these in Vercel > Project > Settings > Environment Variables (see `.env.example`):

- `RESEND_API_KEY` - from resend.com
- `QUOTE_TO_EMAIL` - where quote requests are sent
- `QUOTE_FROM_EMAIL` - optional, a sender on a domain verified in Resend

In local dev without these, submissions are printed to the terminal. In production without them, the form shows an error with the phone number.
