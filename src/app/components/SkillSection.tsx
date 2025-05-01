import { BookAIcon, CloudIcon, SquareTerminalIcon } from "lucide-react";

export const SkillsSection = () => {
    const skills = [
        {
            category: 'Languages',
            items: [
                { name: 'TypeScript', color: 'bg-blue-600/50', textColor: 'text-blue-300' },
                { name: 'JavaScript', color: 'bg-yellow-600/50', textColor: 'text-yellow-300' },
                { name: 'Java', color: 'bg-orange-600/50', textColor: 'text-orange-300' },
                { name: 'PHP', color: 'bg-purple-600/50', textColor: 'text-purple-300' },
                { name: 'C#', color: 'bg-blue-600/50', textColor: 'text-blue-300' },
                { name: 'HTML', color: 'bg-orange-600/50', textColor: 'text-orange-300' },
                { name: 'CSS', color: 'bg-purple-600/50', textColor: 'text-purple-300' },
            ],
            icon: <BookAIcon className="w-4 h-4" />,
        },
        {
            category: 'Backend',
            items: [
                { name: 'Node.js', color: 'bg-green-600/50', textColor: 'text-green-300' },
                { name: 'PostgreSQL', color: 'bg-indigo-600/50', textColor: 'text-indigo-300' },
                { name: 'MySQL', color: 'bg-cyan-600/50', textColor: 'text-cyan-300' },
                { name: 'Redis', color: 'bg-red-400/50', textColor: 'text-red-300' }
            ],
            icon: <SquareTerminalIcon className="w-4 h-4" />,
        },
        {
            category: 'Cloud',
            items: [
                { name: 'Cloudflare', color: 'bg-orange-600/50', textColor: 'text-orange-300' },
                { name: 'Docker', color: 'bg-blue-600/50', textColor: 'text-blue-300' }
            ],
            icon: <CloudIcon className="w-4 h-4" />,
        },
    ];

    return (
        <div className="py-6 bg-zinc-900 px-6">
            <div className="space-y-4 max-w-2xl mx-auto">
                <div>
                    <h3 className="text-lg font-semibold text-white text-center md:text-left">Core Skills</h3>
                    <div className="h-px w-full bg-zinc-700 mt-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skills.map((skillGroup) => (
                        <div key={skillGroup.category}>
                            <div className="flex items-center space-x-2 mb-2">
                                {skillGroup.icon}
                                <h4 className="text-sm font-medium text-zinc-400">{skillGroup.category}</h4>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {skillGroup.items.map((skill) => (
                                    <span
                                        key={skill.name}
                                        className={`px-2.5 py-1 text-sm ${skill.color} ${skill.textColor} rounded-md`}
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};