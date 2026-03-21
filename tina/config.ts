import { defineConfig } from "tinacms";

// Your hosting URL (update after Replit deploy)
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get these from tina.io after connecting the repo
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Artikel",
        path: "src/content/posts",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titel",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Beschreibung",
          },
          {
            type: "datetime",
            name: "date",
            label: "Datum",
          },
          {
            type: "image",
            name: "heroImage",
            label: "Titelbild",
          },
          {
            type: "string",
            name: "category",
            label: "Kategorie",
            options: [
              "Reiseziele",
              "Hotels",
              "Flugreisen",
              "Kreuzfahrten",
              "Reisetipps",
              "Abenteuer",
            ],
          },
          {
            type: "string",
            name: "author",
            label: "Autor",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Inhalt",
            isBody: true,
          },
        ],
      },
      {
        name: "page",
        label: "Seiten",
        path: "src/content/pages",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titel",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Beschreibung",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Inhalt",
            isBody: true,
          },
        ],
      },
    ],
  },
});
