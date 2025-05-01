export const ExperienceSection = () => {
    // TODO: Also move this to the database
    const experiences = [
        {
            role: 'Software Engineer',
            company: 'Comsa! BV.',
            period: 'Feb 2025 - Present',
            type: "On-Site",
            isIntern: true,
            highlights: 'Working on multiple websites using Sulu CMS and developing internal tools.',
        },
        {
            role: 'Full Stack Developer',
            company: 'CodeWolf',
            period: 'Jun 2024 - Aug 2024',
            type: "Remote",
            isIntern: true,
            highlights: 'Worked on BandManager using ASP.NET',
        },
        {
            role: 'Senior Web Developer',
            company: 'Wynntils',
            period: 'Jan 2019 - Present',
            type: "Remote",
            isIntern: false,
            highlights: 'Building the Athena API and the Wynntils website using Laravel en React.',
        },
    ];

    return (
        <div className="py-6 bg-zinc-900 px-6">
            <div className="space-y-4 max-w-2xl mx-auto">
                <div>
                    <h3 className="text-lg font-semibold text-white text-center md:text-left">Experience</h3>
                    <div className="h-px w-full bg-zinc-700 mt-2" />
                </div>

                <div className="space-y-5">
                    {experiences.map((exp) => (
                        <div key={exp.company} className="relative">
                            <div className="relative pl-4 border-l-2 border-zinc-700">
                                <div className="absolute -left-[5px] top-[10px] h-2.5 w-2.5 rounded-full bg-zinc-600" />

                                <div className="space-y-1">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                        <span className="text-md font-medium text-white">
                                            <h4>{exp.role}</h4>
                                            {exp.isIntern && (
                                                <p className="text-xs text-zinc-500 mt-1">Internship</p>
                                            )}
                                        </span>
                                        <span className="text-sm text-zinc-400 text-right">
                                            {exp.type}
                                            <br/>
                                            {exp.period}
                                        </span>
                                    </div>
                                    <p className="text-sm font-medium text-zinc-300">{exp.company}</p>
                                    <p className="text-sm text-zinc-400 leading-relaxed">{exp.highlights}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};