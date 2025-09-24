import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { prismaClient } from "@repo/db/client";

export default async function Home() {
  const users = await prismaClient.user.findMany({});
  if (!users) {
    return <div className={styles.page}> No users</div>;
  }
  return (
    <div className={styles.page}>
      {" "}
      done welcome users {users.map((user) => user.username)}
    </div>
  );
}

// export const dynamic = "force-dynamic";
