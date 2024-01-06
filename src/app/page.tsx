import { IconButton } from "@/components/ui/IconButton";
import { SpotifyCard } from "@/components/ui/SpotifyCard";
import { Window } from "@/components/ui/Window";
import { getCurrentPlayback } from "@/lib/spotify";
import { Github, Headphones, Mail } from "lucide-react";
import Image from "next/image";

export default async function Home() {

  let data = await getCurrentPlayback();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Window title="Welcome">
        <div className="flex flex-col sm:flex-row gap-4 px-4">
          <Image
            src="/img/headshot.jpg"
            alt="Headshot image"
            width={100}
            height={100}
            className="rounded-md"
          />
          <section className="space-y-2">
            <div>
              <h1 className="font-bold text-2xl">Lucas Pauwels</h1>
              <p>Freelance Software Engineer</p>
            </div>
            <div className="flex gap-2">
              <IconButton
                href="https://github.com/DevChromium"
                name={"github"}
              />
              <IconButton
                href="mailto:contact@devchromium.work"
                name={"mail"}
              />
            </div>
          </section>
        </div>
        {data.is_playing === true && (
          <div className="px-4 pb-4">
            <h3 className="font-medium text-lg inline-flex gap-2 items-center">
              <Headphones /> Listening to Spotify
            </h3>
            <SpotifyCard data={data} />
          </div>
        )}
      </Window>
    </main>
  );
}
