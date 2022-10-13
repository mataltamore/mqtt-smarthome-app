import {
  MqttClient,
  IClientOptions,
  connect as mqttConnect,
  IClientSubscribeOptions,
  CloseCallback,
} from "precompiled-mqtt";
import { useEffect, useState } from "react";

type MQTTStatus =
  | "Connect"
  | "Connected"
  | "Reconnecting"
  | "Connecting"
  | "Disconnecting";
type MQTTPayloadItem = { topic: string; data: string };
type MQTTPayload = Array<MQTTPayloadItem>;

export default function useMQTT() {
  const [client, setClient] = useState<MqttClient>();
  const [status, setStatus] = useState<MQTTStatus>("Connect");
  const [payloads, setPayloads] = useState<MQTTPayload>([]);

  useEffect(() => {
    if (!client) return;

    client.on("connect", () => {
      setStatus("Connected");
    });

    client.on("error", (error) => {
      console.error(`While proceding an action got this error: ${error}`);
      client.end();
    });

    client.on("reconnect", () => {
      setStatus("Reconnecting");
    });

    // client.on("disconnect", () => {
    //   setStatus("Disconnect");
    // });

    client.on("close", () => {
      setStatus("Disconnecting");
    });

    client.on("end", () => {
      setStatus("Connect");
    });

    client.on("error", (error) => {
      console.error(`An error has occurred: ${error}`);
    });

    client.on("message", (topic, message) => {
      if (!payloads.find((item) => item.topic === topic))
        setPayloads((prev) => [...prev, { topic, data: message.toString() }]);

      setPayloads((prev) =>
        prev.map((item) => {
          if (item.topic === topic)
            return { ...item, data: message.toString() };
          return item;
        })
      );
    });

    return () => {
      client.removeAllListeners();
    };
  }, [client, payloads]);

  function connect(brokerUrl: string, mqttOption: IClientOptions) {
    if (status === "Connected") return;

    setStatus("Connecting");
    setClient(mqttConnect(brokerUrl, mqttOption));
  }

  function disconnect() {
    if (!client) return;

    client.end(true);
  }

  function subscribe(topic: string) {
    if (!client) return;

    const closeCallback: CloseCallback = (error) => {
      if (error)
        return console.error(`Subscribe to ${topic} got this error: ${error}`);
    };
    const options: IClientSubscribeOptions = { qos: 1 };

    client.subscribe(topic, options, closeCallback);
  }

  function unsubscribe(topic: string) {
    if (!client) return;

    const closeCallback: CloseCallback = (error) => {
      if (error)
        return console.error(
          `Unsubscribe to ${topic} got this error: ${error}`
        );
    };

    client.unsubscribe(topic, closeCallback);
  }

  return {
    client,
    status,
    payloads,
    actions: {
      connect,
      disconnect,
      subscribe,
      unsubscribe,
    },
  };
}
