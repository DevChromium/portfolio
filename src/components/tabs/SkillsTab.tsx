import { cn } from "@/lib/utils";
import skills from "../../../public/json/skills.json"; // TODO: Get this from CMS

interface Skills {
  [key: string]: {
    name: string;
    icon: string;
  }[];
}

export default function SkillsTab() {
  let skillList: Skills = skills;

  return (
    <div className="prose space-y-8 py-4">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Skills</h1>
        <div className="w-[100px] rounded-lg bg-gradient-to-tr from-pink-600 via-pink-500 to-fuchsia-400 px-7 py-1"></div>
        {Object.keys(skillList).map((key) => (
          <div key={key} className="space-y-4">
            <h2 className="text-xl font-bold capitalize">{key}</h2>
            <div className="flex gap-4">
              {" "}
              {skillList[key].map((item, index) => (
                <div
                  key={index}
                  className="aspect-square h-16 w-16 rounded-lg border border-zinc-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <span className="text-2xl">
                    <i className={item.icon} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
