import { useState } from "react";
import { TopicProps } from "../../types/Topic";
import classes from "./Topic.module.scss";

export default function Topic(props: TopicProps) {
  const { subscribe, unsubscribe, payloads } = props;
  // "sensor/temperature"
  const [topicName, setTopicName] = useState("");

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setTopicName(e.currentTarget.value)}
      />
      <button type="button" onClick={() => subscribe(topicName)}>
        Subscribe
      </button>
      <button type="button" onClick={() => unsubscribe(topicName)}>
        Unsubscribe
      </button>

      {payloads.find((payload) => payload.topic === topicName)?.data}
    </div>
  );
}
