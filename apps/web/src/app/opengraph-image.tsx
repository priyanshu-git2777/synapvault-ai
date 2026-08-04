import { ImageResponse } from "next/og";

export const alt = "SynapVault AI — Turn documents into trusted intelligence";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        color: "#0f172a",
        background: "#f8f9ff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 520,
          height: 520,
          borderRadius: 999,
          left: -120,
          top: -160,
          background: "rgba(168, 85, 247, 0.32)",
          filter: "blur(60px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 520,
          height: 520,
          borderRadius: 999,
          right: -120,
          bottom: -180,
          background: "rgba(59, 130, 246, 0.3)",
          filter: "blur(60px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 48,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 52,
          borderRadius: 42,
          border: "2px solid rgba(255,255,255,0.9)",
          background: "rgba(255,255,255,0.72)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              color: "white",
              fontSize: 34,
              fontWeight: 900,
              background:
                "linear-gradient(135deg, rgb(124,58,237), rgb(37,99,235), rgb(6,182,212))",
            }}
          >
            S
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 32,
              fontWeight: 900,
            }}
          >
            SynapVault AI
          </div>
        </div>

        <div
          style={{
            maxWidth: 900,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 70,
              lineHeight: 1.04,
              letterSpacing: "-3px",
              fontWeight: 900,
            }}
          >
            Turn documents into trusted intelligence.
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 26,
              lineHeight: 1.45,
              color: "#475569",
            }}
          >
            Grounded answers. Exact citations. Secure knowledge workspaces.
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
