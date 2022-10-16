import { MainLayoutProps } from "../../types/MainLayout";
import classes from "./MainLayout.module.scss";

export default function MainLayout(props: MainLayoutProps) {
  const { children } = props;

  return <div className={classes.container}>{children}</div>;
}
