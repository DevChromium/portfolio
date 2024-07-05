import { getMyAge } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faDatabase, faGamepad, faPaintBrush } from "@fortawesome/free-solid-svg-icons";

export default function AboutTab() {
    return (
        <div className="py-4 prose space-y-8">
            <div className="space-y-4">
                <h1 className="text-3xl font-bold">About me</h1>
                <div className="px-7 py-1 bg-gradient-to-tr from-pink-600 to-amber-500 w-[100px] rounded-lg"></div>
                <p>
                    Hi, I'm Lucas Pauwels, a {getMyAge()}-year-old web designer and software developer with a deep passion for creating innovative and engaging digital experiences. From a young age, I've been fascinated by technology and its potential to transform the way we live and work. This curiosity led me to pursue a career in web design and software development, where I could merge my creative talents with my technical skills.
                    <br />
                    <br />
                    My journey began with learning the basics of HTML, CSS, and JavaScript, and quickly evolved into mastering more advanced frameworks and technologies. Over the years, I have honed my skills in various areas, including front-end and back-end development, UX/UI design, and responsive web design. I take pride in staying up-to-date with the latest industry trends and best practices to ensure that my work is always cutting-edge and efficient.
                    <br />
                    <br />
                    What sets me apart is my ability to blend artistic design with robust functionality. I believe that a great website or application should not only look stunning but also provide a seamless and intuitive user experience. Whether I'm designing a sleek portfolio site, developing a complex web application, or crafting custom software solutions, I approach each project with enthusiasm, dedication, and a keen eye for detail.
                    <br />
                    <br />
                    Let's connect and create something amazing together!
                </p>
            </div>
            <div className="space-y-4">
                <h2 className="text-3xl font-bold">What I'm doing</h2>
                <div className="grid grid-cols-2 grid-rows-2 gap-8">
                    <Card>
                        <CardHeader className="flex flex-row gap-8">
                            <FontAwesomeIcon icon={faPaintBrush} className="w-16 h-16" />
                            <div>
                                <CardTitle>Web Design</CardTitle>
                                <CardDescription>Creating visual layouts for websites.</CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row gap-8">
                            <FontAwesomeIcon icon={faCode} className="w-16 h-16" />
                            <div>
                                <CardTitle>Front-End Development</CardTitle>
                                <CardDescription>Building interactive elements on the web interface.</CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row gap-8">
                            <FontAwesomeIcon icon={faDatabase} className="w-16 h-16" />
                            <div>
                                <CardTitle>Back-End Development</CardTitle>
                                <CardDescription>Writing server-side logic and databases for web applications.</CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row gap-8">
                            <FontAwesomeIcon icon={faGamepad} className="w-16 h-16" />
                            <div>
                                <CardTitle>Gaming</CardTitle>
                                <CardDescription>Passion for playing and exploring diverse video game experiences.</CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </div>
    )

}