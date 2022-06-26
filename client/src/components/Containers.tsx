import React from "react";
import styles from "./Containers.module.css";

export const AppContainer = (props: React.PropsWithChildren) => (
  <div className={styles.appContainer}>
    <div className={styles.contentContainer}>
      {props.children}
    </div>
  </div>
);

export const Section = (props: React.PropsWithChildren) => (
  <section className={styles.section}>
    {props.children}
  </section>
);

export const Card = (props: React.PropsWithChildren) => (
  <div className={styles.card}>
    {props.children}
  </div>
);

export const ButtonRow = (props: React.PropsWithChildren) => (
  <div className={styles.buttonRow}>
    {props.children}
  </div>
);
