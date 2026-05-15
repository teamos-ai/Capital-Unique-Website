import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const alt = "Capital Unique — Capital Intelligently Applied";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(ellipse at 50% 0%, #5a2d12 0%, #080808 60%)",
          padding: "80px",
          color: "#F2F2F2",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#d98b4a",
          }}
        >
          Australian Non-Bank Capital
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              fontSize: 40,
              marginTop: 16,
              color: "#bdbdbd",
            }}
          >
            {SITE_TAGLINE}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 24,
            color: "#9a9a9a",
          }}
        >
          <span>Non-bank lending for complex scenarios</span>
          <span style={{ color: "#d98b4a" }}>capitalunique.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
