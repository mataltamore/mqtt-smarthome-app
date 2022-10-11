import { useEffect, useState } from "react";

import Connection from "./Connection";

import {
  CloseCallback,
  connect,
  IClientOptions,
  MqttClient,
} from "precompiled-mqtt";
import { IClientSubscribeOptions } from "mqtt";

export default function App() {
  const [client, setClient] = useState<MqttClient>();
  const [connectStatus, setConnectStatus] = useState("Connect");
  const [isSubbed, setIsSubbed] = useState(false);
  const [payload, setPayload] = useState({});

  const mqttConnect = (host: string, mqttOption: IClientOptions) => {
    setConnectStatus("Connecting");
    setClient(connect(host, mqttOption));
  };

  useEffect(() => {
    if (!client) return;

    client.on("connect", () => {
      setConnectStatus("Connected");
    });
    client.on("error", (err) => {
      console.error("Connection error: ", err);
      client.end();
    });
    client.on("reconnect", () => {
      setConnectStatus("Reconnecting");
    });
    client.on("message", (topic, message) => {
      const payload = { topic, message: message.toString() };
      setPayload(payload);
    });
    client.on("disconnect", () => {
      setConnectStatus("Connect");
    });
  }, [client]);

  const mqttDisconnect = () => {
    if (!client) return;

    client.end(true);
  };

  const mqttSub = (subscription: { topic: string }) => {
    if (!client) return;

    const { topic } = subscription;
    const closeCallback: CloseCallback = (error) => {
      if (error) {
        console.log("Subscribe to topics error", error);
        return;
      }
      setIsSubbed(true);
    };
    const options: IClientSubscribeOptions = { qos: 1 };
    client.subscribe(topic, options, closeCallback);
  };

  const mqttUnSub = (subscription: { topic: string }) => {
    if (!client) return;

    const { topic } = subscription;
    const closeCallback: CloseCallback = (error) => {
      if (error) {
        console.log("Unsubscribe error", error);
        return;
      }
      setIsSubbed(false);
    };
    client.unsubscribe(topic, closeCallback);
  };

  const handleSubscribe = () => {
    const record = {
      topic: "sensor/temperature",
    };
    mqttSub(record);
  };

  const handleUnsubscribe = () => {
    const record = {
      topic: "sensor/temperature",
    };
    mqttUnSub(record);
  };

  return (
    <>
      <Connection
        connect={mqttConnect}
        disconnect={mqttDisconnect}
        connectBtn={connectStatus}
      />
      <button type="button" onClick={handleSubscribe}>
        Subscribe
      </button>
      <button type="button" onClick={handleUnsubscribe}>
        Unsubscribe
      </button>
      {isSubbed ? "Subbed" : "Unsubbed"}
      <div>Payload: {JSON.stringify(payload)}</div>
    </>
  );
}
