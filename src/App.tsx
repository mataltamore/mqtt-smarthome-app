import MainLayout from "./components/MainLayout";
import Connect from "./components/Connect";
import useMQTT from "./hooks/useMQTT";
import { useState } from "react";
import AddTopic from "./components/AddTopic";
import Topic from "./components/Topic";

export default function App() {
  const { status, payloads, actions } = useMQTT();
  const { connect, disconnect, subscribe, unsubscribe } = actions;

  const [renderTopic, setRenderTopic] = useState(["topic1"]);

  return (
    <MainLayout>
      <Connect connectBtn={status} {...{ connect, disconnect }} />

      {renderTopic.map((topic) => (
        <Topic {...{ subscribe, unsubscribe, payloads }} key={topic} />
      ))}

      <AddTopic
        handleClick={() =>
          setRenderTopic((prev) => [...prev, `topic${renderTopic.length + 1}`])
        }
      />
    </MainLayout>
  );
}
