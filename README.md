# KC Home Water website

Marketing site for KC Home Water (d/b/a of Whole Home Water LLC). Next.js + shadcn/ui, deployed on Vercel.

## Develop

```bash
npm install
npm run dev   # http://localhost:3000
```

## Where things live

- `src/lib/site.ts` - phone, email, address, domain, service-area cities
- `src/components/site/` - one file per page section (hero, systems, FAQ, chat widget, ...)
- `src/components/ui/` - shadcn/ui components (add more with `npx shadcn@latest add <name>`)
- `src/app/privacy`, `src/app/terms` - legal pages (the A2P 10DLC text-messaging registration requires them)

Search for `TODO` to find placeholder content that still needs confirming.

## Leads

The GoHighLevel chat widget (`src/components/site/chat-widget.tsx`) is the site's only lead form, and leads go straight into GHL. "Chat with us" buttons open it (`chat-button.tsx`).

Don't add another form that collects phone numbers or SMS consent. A2P 10DLC registration is rejected when a site has more than one opt-in source.
