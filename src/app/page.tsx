import { IconButton } from "@/components/ui/IconButton";
import { SpotifyCard } from "@/components/ui/SpotifyCard";
import { Window } from "@/components/ui/Window";
import { fetchAndUpdatePlayback } from "@/lib/spotify";
import { Info } from "lucide-react";
import Image from "next/image";

import { ProgressBar } from "@/components/ui/ProgressBar";
import skills from "../../public/json/skills.json";

interface Skills {
  [key: string]: {
    name: string;
    icon: string;
    proficiency: string;
  }[];
}



export default async function Home() {
  let songData = await fetchAndUpdatePlayback();
  let skillList: Skills = skills;

  return (
    <main className="min-h-screen grid grid-cols-1 sm:grid-cols-4 sm:grid-rows-4 gap-4 m-8">
      <Window title="Welcome!" className="col-auto row-auto sm:col-span-2 justify-between">
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
              <p>Software Engineer</p>
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
        <div className="px-4 pb-4 space-y-4">
          <h3 className="font-white text-lg inline-flex gap-2 items-center font-bold">
            <Info size={30} />
            <span>About me</span>
          </h3>
          <p>
            Hey, I&lsquo;m Lucas, a 22 year old software engineer passionate
            about solving complex problems through elegant code. With 8+
            self-taught years of experience, I thrive on innovation and enjoy
            creating websites and API&lsquo;s. I&lsquo;m driven by the desire to
            create impactful software and love collaborating in dynamic, diverse
            teams. Let&lsquo;s build something amazing together!
          </p>
          {songData.is_playing === true && (
            <>
              <h3 className="font-medium text-lg inline-flex gap-2 items-center">
                <Image
                  priority
                  src="/spotify.svg"
                  alt="Spotify icon"
                  width={30}
                  height={30}
                  className="text-white"
                />{" "}
                Listening to Spotify
              </h3>
              <SpotifyCard data={songData} />
            </>
          )}
        </div>
      </Window>

      <Window
        title="Blog posts"
        className="col-auto row-auto sm:col-span-2 sm:row-span-2 sm:col-start-1 sm:row-start-auto"
      >
        <div className="p-4 text-center">Coming soon...</div>
      </Window>
      <Window
        title="My Skills"
        className="col-auto row-auto sm:col-span-2 sm:row-span-3 sm:col-start-3 sm:row-start-1 justify-start"
      >
        <div className="p-4 flex flex-col gap-8">
          {Object.keys(skillList).map((key) => (
            <div key={key} className="space-y-4">
              <h2 className="capitalize font-bold text-xl">{key}</h2>
              {skillList[key].map((item, index) => (
                <div
                  key={index}
                  className="inline-flex gap-2 items-center w-full"
                >
                  <span className="inline-flex gap-2 items-center w-full">
                    <i className={item.icon} /> {item.name}
                  </span>
                  <span>{item.proficiency}%</span>
                  <ProgressBar
                    value={parseInt(item.proficiency)}
                    className="bg-rose-500"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </Window>
    </main>
  );
}
