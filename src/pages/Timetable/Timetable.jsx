import React from "react";

function getSystemDark() {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return false;
}

const lightTheme = {
  background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  text: "#2D3748",
  border: "#764ba2",
};
const darkTheme = {
  background: "linear-gradient(135deg, #0f2027 0%, #2c5364 50%, #232526 100%)",
  text: "#F7FAFC",
  border: "#63B3ED",
  imgFilter: "invert(1) hue-rotate(180deg) brightness(1.1) contrast(1.1)",
};

export default function Timetable() {
  const [darkMode, setDarkMode] = React.useState(getSystemDark());
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e) => setDarkMode(e.matches);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);
  const theme = darkMode ? darkTheme : lightTheme;
  return (
    <div
      style={{
        background: theme.background,
        minHeight: "100vh",
        color: theme.text,
        transition: "background 0.3s, color 0.3s",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background shapes (only in dark mode for best effect) */}
      {darkMode && (
        <>
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "5%",
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "rgba(44,83,100,0.18)",
              boxShadow: "0 8px 32px #0f2027cc",
              filter: "blur(2px)",
              animation: "float1 7s ease-in-out infinite alternate",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "15%",
              right: "8%",
              width: 90,
              height: 90,
              borderRadius: "20% 80% 60% 40% / 40% 30% 70% 60%",
              background: "rgba(15,32,39,0.22)",
              boxShadow: "0 8px 32px #232526cc",
              filter: "blur(1.5px)",
              animation: "float2 9s ease-in-out infinite alternate-reverse",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "60%",
              left: "20%",
              width: 60,
              height: 60,
              borderRadius: "12px",
              background: "rgba(99,179,237,0.13)",
              boxShadow: "0 4px 16px #63B3ED55",
              filter: "blur(1.5px)",
              animation: "float3 6s ease-in-out infinite alternate",
              zIndex: 0,
            }}
          />
        </>
      )}
      <h1 style={{ color: theme.text, position: "relative", zIndex: 1 }}>
        Time-table: CSE
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <img
          src="./timetable.png"
          style={{
            maxWidth: "70%",
            height: "auto",
            border: `3px solid ${theme.border}`,
            borderRadius: "30px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            background: darkMode ? "#232526" : "#fff",
            transition: "border 0.3s, background 0.3s",
            filter: darkMode ? theme.imgFilter : undefined,
          }}
          alt="Timetable"
        />
      </div>
      {/* Keyframes for floating animation */}
      {darkMode && (
        <style>{`
          @keyframes float1 {
            0% { transform: translateY(0) scale(1); }
            100% { transform: translateY(-30px) scale(1.08); }
          }
          @keyframes float2 {
            0% { transform: translateY(0) scale(1); }
            100% { transform: translateY(25px) scale(0.95); }
          }
          @keyframes float3 {
            0% { transform: translateX(0) scale(1); }
            100% { transform: translateX(30px) scale(1.12); }
          }
        `}</style>
      )}
    </div>
  );
}
