import "./globals.css";
import Nametag from "@/components/nametag";
import Text from "@/components/textEntry"
import zelensky from "@/components/images";

export default function Home() {
  return (
    <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col w-full md:flex-row max-w-6xl mx-auto flex-wrap gap-4">
        <ul>
          <Nametag />
        </ul>

        <ul>
          <Text h1='Bienvenue sur mon blog' />
        </ul>
      </main>
    </div>
  );
}
