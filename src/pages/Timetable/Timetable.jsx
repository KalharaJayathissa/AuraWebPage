export default function Timetable() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        minHeight:"100vh"
      }}
    >
      <h1>Time-table: CSE</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src="./timetable.png"
          style={{
            maxWidth: "70%",
            height: "auto",
            border: "3px solid #764ba2",
            borderRadius: "30px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          }}
        />
      </div>
    </div>
  );
}
