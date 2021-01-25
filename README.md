# The Million Startups Website

Built by [Edwin at Devhart.io](https://devhart.io)

Tech Stack 
- [Next.js](https://nextjs.org)
- [Sanity.io](https://www.sanity.io)
- [Vercel](https://vercel.com).
- [Styled Components](https://styled-components.com/)


Report issues at the git hub repository's [issue section](https://github.com/millionstartups/million-startups-website/issues)


### To begin development

You will need a Sanity account and Node installed locally.

Rename the `.env.test` file to `.env` and store the environment variables that Next and Sanity will use to pull data from the Sanity API. You can get or create the tokens, ids, and secrets from [manage.sanity.io](https://manage.sanity.io).

Once those env variables are ready, you can run the following commands to get Next's development server up and running:

```bash
npm install

# Run the frontend
npm run dev

# Run the Studio
npm run start:sanity
```

The blog will be running at `http://localhost:3000`, the Studio will run at `http://localhost:3333`.
