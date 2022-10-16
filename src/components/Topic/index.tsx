import { useRef } from "react";
import { TopicProps } from "../../types/Topic";
import classes from "./Topic.module.scss";

export default function Topic(props: TopicProps) {
  const { subscribe, unsubscribe, payloads } = props;
  // "sensor/temperature"
  const topicName = useRef<HTMLInputElement>(null);

  return (
    <div className={classes.container}>
      <input type="text" ref={topicName} />
      <button
        type="button"
        onClick={() => {
          if (topicName.current) subscribe(topicName.current.value);
        }}
      >
        Subscribe
      </button>
      <button
        type="button"
        onClick={() => {
          if (topicName.current) unsubscribe(topicName.current.value);
        }}
      >
        Unsubscribe
      </button>

      {
        payloads.find((payload) => payload.topic === topicName.current?.value)
          ?.data
      }
    </div>
  );
}
