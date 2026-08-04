import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 18,
        color: "white",
        fontSize: 34,
        fontWeight: 900,
        background:
          "linear-gradient(135deg, rgb(124, 58, 237), rgb(37, 99, 235), rgb(6, 182, 212))",
      }}
    >
      S
    </div>,
    {
      ...size,
    },
  );
}
