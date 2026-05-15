import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

export default function manifest() {
  return {
    name: `${SITE_NAME} — Capital Intelligently Applied`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#080808",
    theme_color: "#080808",
    icons: [
      {
        src: "/brand/logo-square.png",
        sizes: "500x500",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
