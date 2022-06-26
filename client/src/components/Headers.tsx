import React from "react";
import styles from "./Headers.module.css";

export const SubHeader = (props: React.PropsWithChildren) => (
  <h2 className={styles.subHeader}>{props.children}</h2>
);
