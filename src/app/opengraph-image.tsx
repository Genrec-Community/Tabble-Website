import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Tabble — QR code ordering and kitchen display system for restaurants";

/** Shared branded social card — applies to every route via file-based metadata. */
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
          padding: "72px 80px",
          background: "#FFFBF6",
          backgroundImage:
            "radial-gradient(circle at 88% 10%, rgba(249,115,22,0.10) 0%, rgba(249,115,22,0) 42%), radial-gradient(circle at 4% 96%, rgba(249,115,22,0.08) 0%, rgba(249,115,22,0) 36%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* keyword eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div style={{ width: 44, height: 8, background: "#F97316", borderRadius: 8 }} />
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 4,
              color: "#C2540A",
              textTransform: "uppercase",
            }}
          >
            QR Code Ordering · Kitchen Display
          </div>
        </div>

        {/* wordmark + tagline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontSize: 170,
              fontWeight: 700,
              color: "#2B1A10",
              letterSpacing: -6,
              lineHeight: 1,
            }}
          >
            Tabble
            <span style={{ color: "#F97316", fontSize: 170, fontWeight: 700 }}>.</span>
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 52,
              fontWeight: 600,
              color: "#5A4634",
              lineHeight: 1.25,
              maxWidth: 940,
            }}
          >
            Every table becomes your best waiter.
          </div>
          <div style={{ marginTop: 20, fontSize: 30, color: "#7A6552", maxWidth: 960, lineHeight: 1.4 }}>
            Guests scan, order and pay from their phone — every order lands on the
            kitchen screen the moment it&apos;s placed.
          </div>
        </div>

        {/* footer strip */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "#2B1A10",
                color: "#FFFBF6",
                fontSize: 26,
                fontWeight: 700,
                padding: "16px 28px",
                borderRadius: 999,
              }}
            >
              tabble.app
            </div>
            <div style={{ fontSize: 26, color: "#7A6552", fontWeight: 600 }}>
              Now onboarding the first 50 restaurants
            </div>
          </div>
          {/* QR-corner motif */}
          <div style={{ display: "flex", gap: 6 }}>
            {[0, 1, 2].map((r) => (
              <div key={r} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[0, 1, 2].map((c) => (
                  <div
                    key={c}
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 4,
                      background: (r + c) % 2 === 0 ? "#F97316" : "rgba(249,115,22,0.25)",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
