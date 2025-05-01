import {ProfileSection} from "@/app/components/ProfileSection";
import {SkillsSection} from "@/app/components/SkillSection";
import {ExperienceSection} from "@/app/components/ExperienceSection";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-zinc-900">
        <div className="flex-1 grid lg:grid-cols-5">
            <div
                className="md:col-span-2 border-b md:border-b-0 md:border-r border-gray-200 dark:border-zinc-800 md:flex md:items-center py-12">
                <ProfileSection/>
            </div>
            <div className="md:col-span-3 flex flex-col md:justify-center">
                {/* Skills Section */}
                <div>
                    <SkillsSection/>
                </div>
                <div>
                    <ExperienceSection/>
                </div>

            </div>
        </div>
    </main>
  );
}
