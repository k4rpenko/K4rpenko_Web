import Image from "next/image";
import styles from "./page.module.css";
import TextBackround from "@/module/Castomizate/TextBackround";

export default function Two() {
  return (
    <div className={styles.page}>
      <div className={styles.painting}>
        <Image
          src={`/painting/Morning_in_a_Pine_Forest.jpg`} 
          alt={"Morning in a Pine Forest"} 
          fill={true} 
          style={{ objectFit: "cover" }} 
          sizes="(max-width: 768px) 100vw, 800px"
        ></Image>
      </div>
      <div className={styles.AboutMe}>
          <h1>About me</h1>
          <p>I am a student at <TextBackround ColorSet={"orange"} Url={"https://www.tuke.sk/sk"}>TUKE</TextBackround> and also a software developer in <TextBackround ColorSet={"purple"} Url={"https://dotnet.microsoft.com/en-us/apps/aspnet"}>ASP.NET</TextBackround>, .NET, Angular, React, Next.js, and others. I work with TypeScript, JavaScript, SASS, and have practical experience with Docker, Redis, and various databases such as SQL/NoSQL (MongoDB, MySQL, PostgreSQL). I took courses at <TextBackround ColorSet={"blue"} Url={"https://itstep.org/uk"}>ITStep</TextBackround>, namely the junior and senior academies. Programming is my main hobby in my free time. When I have nowhere to go, I work on my projects to bring my ideas to life. In addition to all this, I also know C++ and Node.js, and am currently studying RabbitMQ/Kafka and Spring Boot-Java to expand my knowledge.</p>
      </div>
    </div>
  );
}