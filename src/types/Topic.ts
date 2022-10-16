import { MQTTPayload } from "./useMQTT";

export interface TopicProps {
  subscribe: (topic: string) => void;
  unsubscribe: (topic: string) => void;
  payloads: MQTTPayload;
}
