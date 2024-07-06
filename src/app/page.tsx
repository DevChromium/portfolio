import Image from "next/image";
import { SpotifyInfo } from "@/components/ui/SpotifyInfo";

import { Calendar, Mail } from "lucide-react"
import GradientBox from "@/components/core/GradientBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { aGithub, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import AboutTab from "@/components/tabs/AboutTab";
import SkillsTab from "@/components/tabs/SkillsTab";
import ProjectsTab from "@/components/tabs/ProjectsTab"
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";

export default async function Home() {
  return (
    <main className="h-full grid grid-cols-1 sm:grid-cols-4 gap-8  m-8 justify-items-center justify-around items-stretch">
        <section className="col-span-1 p-8 w-full h-full bg-zinc-900/40 border border-zinc-800 flex flex-col items-center rounded-md gap-8">
          <div className="flex flex-col items-center gap-4">
            <Image
                src="/img/headshot.jpg"
                alt="Headshot image"
                width={150}
                height={150}
                className="rounded-md place-self-center"
              />
              <h2 className="font-semibold text-xl">Lucas Pauwels</h2>
              <GradientBox className="px-7 py-4">Full-Stack Developer</GradientBox>
          </div>

          <div className="border-b w-full border-zinc-800"></div>

          <SpotifyInfo/>

          <div className="border-b w-full border-zinc-800"></div>

          <div className="space-y-6 w-full">
            <div className="flex flex-col md:flex-row gap-6 w-full">
                <GradientBox className="p-4">
                  <Mail />
                </GradientBox>
                <div className="flex flex-col">
                    <span className="text-zinc-400 uppercase">Email</span>
                    <p>lucaspauwels@outlook.com</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 w-full">
                <GradientBox className="p-4">
                  <Calendar />
                </GradientBox>
                <div className="flex flex-col">
                    <span className="text-zinc-400 uppercase">Birthday</span>
                    <p>March 22nd, 2002</p>
                </div>
            </div>
          </div>

          <div className="mt-auto flex gap-4 text-zinc-50 items-center">
            <a href="https://github.com/DevChromium" target="_blank" className="h-6 w-6 flex items-center hover:text-pink-600 transition-colors duration-100 ease-in-out"><FontAwesomeIcon icon={faGithub}/></a>
            <a href="mailto:contact@devchromium.work" className="h-6 w-6 flex items-center hover:text-pink-600 transition-colors duration-100 ease-in-out"><FontAwesomeIcon icon={faMailBulk}/></a>
          </div>
        </section>

        <section className="col-span-3 p-8 w-full h-full bg-zinc-900/40 border border-zinc-800 rounded-md">
          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about" className="selected:bg-zinc-950">About me</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
            </TabsList>
            <TabsContent value="about">
              <AboutTab />
            </TabsContent>
            <TabsContent value="skills"><SkillsTab /></TabsContent>
            <TabsContent value="projects"><ProjectsTab /></TabsContent>
          </Tabs>
        </section>
    
    </main>
  );
}

