import classes from "./AddTopic.module.scss";
import { IconCirclePlus } from "@tabler/icons";
import { AddTopicProps } from "../../types/AddTopic";

export default function AddTopic(props: AddTopicProps) {
  const { handleClick } = props;

  return (
    <div className={classes.container} onClick={handleClick}>
      <IconCirclePlus /> Add another topic
    </div>
  );
}
