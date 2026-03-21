// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.TINA_BRANCH || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || "5e22f88d-cb0c-468c-8114-f9e0c6d081ec",
  token: process.env.TINA_TOKEN || "3f82ac14e9fafa7bd3e44ceac09b820abafeed22",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "artikel",
        label: "Artikel",
        path: "src/content/artikel",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titel",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "subtitle",
            label: "Untertitel"
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero-Bild"
          },
          {
            type: "string",
            name: "category",
            label: "Kategorie",
            options: ["St\xE4dtereise", "Strandurlaub", "Abenteuer", "Kulinarik", "Kultur", "Wellness"]
          },
          {
            type: "string",
            name: "author",
            label: "Autor"
          },
          {
            type: "datetime",
            name: "publishDate",
            label: "Ver\xF6ffentlichungsdatum"
          },
          {
            type: "string",
            name: "readTime",
            label: "Lesezeit"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Inhalt",
            isBody: true
          }
        ]
      },
      {
        name: "ziel",
        label: "Reiseziele",
        path: "src/content/ziele",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Zielname",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "subtitle",
            label: "Untertitel"
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero-Bild"
          },
          {
            type: "string",
            name: "region",
            label: "Region"
          },
          {
            type: "string",
            name: "country",
            label: "Land"
          },
          {
            type: "string",
            name: "priceFrom",
            label: "Preis ab"
          },
          {
            type: "string",
            name: "bestTime",
            label: "Beste Reisezeit"
          },
          {
            type: "object",
            name: "highlights",
            label: "Highlights",
            list: true,
            fields: [
              { type: "string", name: "title", label: "Titel" },
              { type: "string", name: "description", label: "Beschreibung" },
              { type: "image", name: "image", label: "Bild" }
            ]
          },
          {
            type: "rich-text",
            name: "body",
            label: "Beschreibung",
            isBody: true
          }
        ]
      },
      {
        name: "deal",
        label: "Deals",
        path: "src/content/deals",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Hotelname",
            isTitle: true,
            required: true
          },
          {
            type: "image",
            name: "image",
            label: "Bild"
          },
          {
            type: "string",
            name: "destination",
            label: "Reiseziel"
          },
          {
            type: "number",
            name: "price",
            label: "Preis (\u20AC)"
          },
          {
            type: "number",
            name: "originalPrice",
            label: "Originalpreis (\u20AC)"
          },
          {
            type: "string",
            name: "discount",
            label: "Rabatt-Label"
          },
          {
            type: "number",
            name: "stars",
            label: "Sterne (1-5)"
          },
          {
            type: "string",
            name: "bookingUrl",
            label: "Buchungs-URL"
          },
          {
            type: "datetime",
            name: "expiresAt",
            label: "G\xFCltig bis"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Beschreibung",
            isBody: true
          }
        ]
      },
      {
        name: "settings",
        label: "Einstellungen",
        path: "src/content/settings",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false
          },
          global: true
        },
        fields: [
          {
            type: "image",
            name: "logo",
            label: "Hauptlogo (Header)",
            description: "Das Logo oben in der Navigation (wei\xDF auf rotem Hintergrund)"
          },
          {
            type: "string",
            name: "siteTitle",
            label: "Seitentitel"
          },
          {
            type: "string",
            name: "siteDescription",
            label: "Seitenbeschreibung"
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
