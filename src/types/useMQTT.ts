export type MQTTStatus =
  | "Connect"
  | "Connected"
  | "Reconnecting"
  | "Connecting"
  | "Disconnecting";
export type MQTTPayloadItem = { topic: string; data: string };
export type MQTTPayload = Array<MQTTPayloadItem>;
