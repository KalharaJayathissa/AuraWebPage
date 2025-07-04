import { AlignHorizontalCenter } from "@mui/icons-material";
import "./Login.css";

export default function Login() {
  return (
    <div
      className="container"
      style={{
        background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      }}
    >
      <form className="box">
        <img
          src="./logo.png"
          height={175}
          style={{ display: "block", margin: "auto" ,filter: "drop-shadow(0 0 5px rgba(102, 126, 234, 0.7))" }}
        />
        <div>
          <input
            type="text"
            placeholder="User name"
            required
            id="username"
            className="inputs"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            required
            id="password"
            className="inputs"
          />
        </div>
        <button id="submit">Log in</button>
      </form>
    </div>
  );
}
