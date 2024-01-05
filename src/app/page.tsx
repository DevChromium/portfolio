import { SpotifyCard } from "@/components/ui/SpotifyCard";
import { getCurrentPlayback } from "@/lib/spotify";
import { Github, Mail } from "lucide-react";
import Image from "next/image";

export default async function Home() {

  let data = null

  try {
    data = await getCurrentPlayback();
  } catch(error) {
    console.log(error)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="h-full w-full bg-zinc-900/25 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-zinc-900/95 flex flex-col gap-4 p-4 max-w-lg">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
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
              <a className="bg-rose-300 hover:bg-rose-300/90 h-10 w-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors ease-in-out" href="https://github.com/devchromium" target="_blank">
                <Github />
              </a>
              <a className="bg-rose-300 hover:bg-rose-300/90 h-10 w-10 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors ease-in-out" href="mailto:contact@devchromium.work">
                <Mail />
              </a>
            </div>
          </section>
        </div>
        {data.is_playing === true && (
          <div>
            <h3 className="font-bold text-lg">Listening to Spotify</h3>
            <SpotifyCard data={data} />
          </div>
        )}
      </section>
    </main>
  );
}
