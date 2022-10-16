import { IClientOptions } from "precompiled-mqtt";

export interface ConnectProps {
  connect: (host: string, mqttOption: IClientOptions) => void;
  disconnect: () => void;
  connectBtn: string;
}
