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
        <div className="py-4 prose space-y-8">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">Skills</h1>
                <div className="px-7 py-1 bg-gradient-to-tr from-pink-600 to-amber-500 w-[100px] rounded-lg"></div>
                {Object.keys(skillList).map((key) => (
                    <div key={key} className="space-y-4">
                        <h2 className="capitalize font-bold text-xl">{key}</h2>
                        <div className="flex gap-4"> {skillList[key].map((item, index) => (
                            <div
                                key={index}
                                className="p-4 w-16 h-16 bg-zinc-950 border border-zinc-800 rounded-lg aspect-square text-center"
                            >
                                <span className="text-2xl">
                                    <i className={item.icon} />
                                </span>
                            </div>
                        ))}</div>
                    </div>
                ))}
            </div>

        </div>
    )
}