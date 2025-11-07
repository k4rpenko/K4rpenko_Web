import { ReactNode } from "react";
import styles from "./taxt.module.css";

interface TextBackroundProps {
  ColorSet: string;
  children: ReactNode;
  Url: string;
}


export default function TextBackround({ ColorSet, Url, children }: TextBackroundProps) {

  const classNames = `${styles.page} ${styles[ColorSet] || ""}`;
  return (
    <a className={classNames} href={Url}>
      {children}
    </a>
  );
}
