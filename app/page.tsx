import "./globals.css";
import Nametag from "@/components/nametag";
import { Children } from "react";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main>
        <Nametag />
      </main>
    </div>
  );
}
