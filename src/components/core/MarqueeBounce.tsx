import { TargetAndTransition, motion } from "framer-motion";

type MarqueeBounceProps = {
    url: string
    text: string
    textWidth: number
    maxTextWidth: number
};

export function MarqueeBounce({ url, text, textWidth, maxTextWidth }: MarqueeBounceProps) {

    const isMobile = window.innerWidth <= 1024;
    const animationProperties: TargetAndTransition = {
        x: -(textWidth - (maxTextWidth - text.length)),
        transition: {
            duration: text.length / 10,
            repeat: Infinity,
            repeatType: "mirror",
            type: "tween",
            ease: "linear",
        },
    };

    return (
      <motion.a
        className={`whitespace-nowrap hover:underline`}
        href={url}
        target="_blank"
        whileHover={textWidth >= maxTextWidth ? animationProperties : {}}
        animate={
          isMobile && textWidth >= maxTextWidth ? animationProperties : {}
        }
      >
        {text}
      </motion.a>
    );
}
