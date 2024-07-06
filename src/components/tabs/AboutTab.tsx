import { getMyAge } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faDatabase,
  faGamepad,
  faPaintBrush,
} from "@fortawesome/free-solid-svg-icons";

export default function AboutTab() {
  return (
    <div className="prose space-y-8 py-4">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">About me</h1>
        <div className="w-[100px] rounded-lg bg-gradient-to-tr from-pink-600 to-amber-500 px-7 py-1"></div>
        <p>
          Hi, I&apos;m Lucas Pauwels, a {getMyAge()}-year-old web designer and
          software developer with a deep passion for creating innovative and
          engaging digital experiences. From a young age, I&apos;ve been
          fascinated by technology and its potential to transform the way we
          live and work. This curiosity led me to pursue a career in web design
          and software development, where I could merge my creative talents with
          my technical skills.
          <br />
          <br />
          My journey began with learning the basics of HTML, CSS, and
          JavaScript, and quickly evolved into mastering more advanced
          frameworks and technologies. Over the years, I have honed my skills in
          various areas, including front-end and back-end development, UX/UI
          design, and responsive web design. I take pride in staying up-to-date
          with the latest industry trends and best practices to ensure that my
          work is always cutting-edge and efficient.
          <br />
          <br />
          What sets me apart is my ability to blend artistic design with robust
          functionality. I believe that a great website or application should
          not only look stunning but also provide a seamless and intuitive user
          experience. Whether I&apos;m designing a sleek portfolio site,
          developing a complex web application, or crafting custom software
          solutions, I approach each project with enthusiasm, dedication, and a
          keen eye for detail.
          <br />
          <br />
          Let&apos;s connect and create something amazing together!
        </p>
      </div>
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">What I&apos;m doing</h2>
        <div className="grid grid-cols-2 grid-rows-2 gap-8">
          <Card className="grid w-full gap-6 p-6">
            <div className="flex items-center gap-4">
              <div className="flex aspect-square w-12 items-center justify-center rounded-md bg-zinc-950 dark:bg-zinc-100">
                <FontAwesomeIcon
                  icon={faPaintBrush}
                  className="h-6 w-6 text-zinc-100 dark:text-zinc-950"
                />
              </div>
              <h3 className="text-xl font-semibold">Web Design</h3>
            </div>
            <p className="text-muted-foreground">
              Creating visual layouts for websites.
            </p>
          </Card>

          <Card className="grid w-full gap-6 p-6">
            <div className="flex items-center gap-4">
              <div className="flex aspect-square w-12 items-center justify-center rounded-md bg-zinc-950 dark:bg-zinc-100">
                <FontAwesomeIcon
                  icon={faCode}
                  className="h-6 w-6 text-zinc-100 dark:text-zinc-950"
                />
              </div>
              <h3 className="text-xl font-semibold">Front-End Development</h3>
            </div>
            <p className="text-muted-foreground">
              Building interactive elements on the web.
            </p>
          </Card>
          <Card className="grid w-full gap-6 p-6">
            <div className="flex items-center gap-4">
              <div className="flex aspect-square w-12 items-center justify-center rounded-md bg-zinc-950 dark:bg-zinc-100">
                <FontAwesomeIcon
                  icon={faDatabase}
                  className="h-6 w-6 text-zinc-100 dark:text-zinc-950"
                />
              </div>
              <h3 className="text-xl font-semibold">Back-End Development</h3>
            </div>
            <p className="text-muted-foreground">
              Writing server-side logic and databases for web applications
            </p>
          </Card>

          <Card className="grid w-full gap-6 p-6">
            <div className="flex items-center gap-4">
              <div className="flex aspect-square w-12 items-center justify-center rounded-md bg-zinc-950 dark:bg-zinc-100">
                <FontAwesomeIcon
                  icon={faCode}
                  className="h-6 w-6 text-zinc-100 dark:text-zinc-950"
                />
              </div>
              <h3 className="text-xl font-semibold">Gaming</h3>
            </div>
            <p className="text-muted-foreground">
              Passion for playing and exploring diverse video game experiences.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
