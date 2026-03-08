import MainPage from "@/module/Home/One/MainPage";
import styles from "./page.module.css";
import Two from "../module/Home/Two/page";
import Three from "@/module/Home/Three/page";

export default function Home() {
  return (
    <main className={styles.page}>
      <div id="main" className={styles.one}>
        <div className={styles.title}>
          <h1>Welcome to my development website</h1>
          <h3>
            created purely for the purpose of getting to know me and my work
          </h3>
        </div>
        <div className={styles.MainPage}>
          <MainPage/>
        </div>
      </div>

      <section id="whoim">
        <Two />
      </section>

      <section id="projects">
        <Three />
      </section>
    </main>
  );
}
