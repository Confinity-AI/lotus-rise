import { ImageResponse } from "next/og";

export const alt = "Lotus Rise — Grant reporting for foundations and nonprofits";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "72px 80px",
          background: "linear-gradient(145deg, #0f1654 0%, #1a237e 48%, #2d3894 100%)",
          color: "#fffcf7",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,252,247,0.72)",
            marginBottom: 20,
          }}
        >
          Lotus Rise PBC
        </div>
        <div style={{ fontSize: 64, lineHeight: 1.08, fontWeight: 500, maxWidth: 900 }}>
          Grant reporting built for foundations and nonprofits
        </div>
        <div style={{ fontSize: 28, lineHeight: 1.45, marginTop: 28, maxWidth: 820, color: "rgba(255,252,247,0.82)" }}>
          Your team keeps the workspace. Funders get reports they can review.
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 40,
            fontSize: 18,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#c4e0c9",
          }}
        >
          <span>10:1 subsidy</span>
          <span>·</span>
          <span>$0 for grantees</span>
          <span>·</span>
          <span>Public benefit company</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
