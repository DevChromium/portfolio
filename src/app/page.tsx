import Image from "next/image";
import { SpotifyInfo } from "@/components/ui/SpotifyInfo";

import { Calendar, Mail } from "lucide-react";
import GradientBox from "@/components/core/GradientBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import AboutTab from "@/components/tabs/AboutTab";
import SkillsTab from "@/components/tabs/SkillsTab";
import ProjectsTab from "@/components/tabs/ProjectsTab";
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";

export default async function Home() {
  return (
    <main className="m-8 flex h-full flex-col items-stretch justify-around justify-items-center gap-8 text-zinc-950 lg:flex-row dark:text-zinc-100">
      <section className="flex h-screen w-full flex-col items-center gap-8 rounded-md border border-zinc-200 bg-white p-8 md:max-w-md dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/img/headshot.jpg"
            alt="Headshot image"
            width={150}
            height={150}
            className="place-self-center rounded-md"
          />
          <h2 className="text-xl font-semibold">Lucas Pauwels</h2>
          <GradientBox className="px-7 py-4">Full-Stack Developer</GradientBox>
        </div>

        <div className="w-full border-b border-zinc-200 dark:border-zinc-800"></div>

        <SpotifyInfo />

        <div className="w-full border-b border-zinc-200 dark:border-zinc-800"></div>

        <div className="w-full space-y-6">
          <div className="flex w-full flex-col gap-6 md:flex-row">
            <GradientBox className="p-4">
              <Calendar />
            </GradientBox>
            <div className="flex flex-col">
              <span className="uppercase text-zinc-400">Birthday</span>
              <p>March 22nd, 2002</p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-6 md:flex-row">
            <GradientBox className="p-4">
              <Mail />
            </GradientBox>
            <div className="flex flex-col">
              <span className="uppercase text-zinc-400">Email</span>
              <p>contact@devchromium.work</p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-6 md:flex-row">
            <GradientBox className="p-4">
              <FontAwesomeIcon icon={faDiscord} className="h-6 w-6" />
            </GradientBox>
            <div className="flex flex-col">
              <span className="uppercase text-zinc-400">Discord</span>
              <p>devchromium</p>
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-4 text-zinc-50">
          <a
            href="https://github.com/DevChromium"
            target="_blank"
            className="flex h-6 w-6 items-center transition-colors duration-100 ease-in-out hover:text-pink-600"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="mailto:contact@devchromium.work"
            className="flex h-6 w-6 items-center transition-colors duration-100 ease-in-out hover:text-pink-600"
          >
            <FontAwesomeIcon icon={faMailBulk} />
          </a>
        </div>
      </section>

      <section className="h-full w-full flex-grow gap-8 rounded-md border border-zinc-200 bg-white p-8 xl:col-span-3 dark:border-zinc-800 dark:bg-zinc-900/40">
        <Tabs defaultValue="about">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about" className="selected:bg-zinc-950">
              About me
            </TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>
          <TabsContent value="about">
            <AboutTab />
          </TabsContent>
          <TabsContent value="skills">
            <SkillsTab />
          </TabsContent>
          <TabsContent value="projects">
            <ProjectsTab />
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
