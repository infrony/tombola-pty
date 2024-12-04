# About the project development

Working with Next.js + Google Sheet API

## Configure Google Cloud Console

- Add new project in your organization

    [new project](https://console.cloud.google.com/projectcreate)

- Add Google Sheet API from the API library

    [Google Sheet API](https://console.cloud.google.com/apis/library/sheets.googleapis.com)

- Enable it

- Add a service account and add a key to the service account
- Download de json file
- Use the GOOGLE_PRIVATE_KEY and the GOOGLE_SERVICE_ACCOUNT_EMAIL in .env

- Create a google sheet and copy ID from google sheet url and save in .env as GOOGLE_SPREADSHEET_ID="Your Sheet ID"

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Coming soon

- Countdown giveaway automated
- User Registration
- User Configure a new Sheet ID
- Site Translations

## License

MIT: [https://infrony.mit-license.org](https://infrony.mit-license.org/).
