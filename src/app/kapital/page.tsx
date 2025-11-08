import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.logo}>
        <Image src={`/logo/ic_launcher.png`} alt="" style={{backgroundColor: "#1f1f1f", borderRadius: 10,}} width={60}height={60}/>
      </div>
      <h1>Comming soom</h1>
    </div>
  );
}
