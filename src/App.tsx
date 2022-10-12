import Connection from "./Connection";
import useMQTT from "./hooks/useMQTT";

export default function App() {
  const { status, payloads, actions } = useMQTT();
  const { connect, disconnect, subscribe, unsubscribe } = actions;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "1rem",
        height: "100vh",
      }}
    >
      <Connection connectBtn={status} {...{ connect, disconnect }} />

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: "1rem",
          }}
        >
          <button type="button" onClick={() => subscribe("sensor/temperature")}>
            Subscribe
          </button>
          <button
            type="button"
            onClick={() => unsubscribe("sensor/temperature")}
          >
            Unsubscribe
          </button>
        </div>

        <ul>
          {payloads.map((payload) => (
            <li key={payload.topic}>
              TOPIC: {payload.topic}
              <p style={{ fontWeight: 700, fontSize: 40, textAlign: "center" }}>
                {payload.data}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
