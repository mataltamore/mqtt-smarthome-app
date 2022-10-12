import { IClientOptions } from "mqtt";
import { useRef } from "react";
interface ConnectionProps {
  connect: (host: string, mqttOption: IClientOptions) => void;
  disconnect: () => void;
  connectBtn: string;
}

export default function Connection(props: ConnectionProps) {
  const { connect, disconnect, connectBtn } = props;
  const hostRef = useRef<HTMLInputElement>(null);
  const portRef = useRef<HTMLInputElement>(null);
  const clientIdRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleConnect = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const url = `wss://${hostRef.current?.value}:${portRef.current?.value}/`;

    const options: IClientOptions = {
      keepalive: 30,
      protocolId: "MQTT",
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: "WillMsg",
        payload: "Connection Closed abnormally..!",
        qos: 0,
        retain: false,
      },
      rejectUnauthorized: false,
    };
    options.clientId = clientIdRef.current?.value ?? undefined;
    options.username = usernameRef.current?.value ?? undefined;
    options.password = passwordRef.current?.value ?? undefined;
    connect(url, options);
  };

  const handleDisconnect = () => {
    disconnect();
  };

  return (
    <form
      onSubmit={handleConnect}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        maxWidth: 350,
      }}
    >
      <input type="text" placeholder="host" name="host" ref={hostRef} />
      <input type="text" placeholder="port" name="port" ref={portRef} />
      <input
        type="text"
        placeholder="client-id"
        name="clientid"
        ref={clientIdRef}
      />
      <input
        type="text"
        placeholder="username"
        name="username"
        ref={usernameRef}
      />
      <input
        type="text"
        placeholder="password"
        name="password"
        ref={passwordRef}
      />

      <button type="submit">{connectBtn}</button>
      <button type="button" onClick={handleDisconnect}>
        Disconnect
      </button>
    </form>
  );
}
