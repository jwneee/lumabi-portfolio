import { useState, useEffect, useRef } from "react";

export default function Typewriter() {
  const words = ["Web Developer", "UI/UX Designer", "Graphic Designer", "Visual Creator"];
  const [displayText, setDisplayText] = useState("");
  const [blink, setBlink] = useState(true);

  const stateRef = useRef({
    wordIndex: 0,
    text: "",
    isDeleting: false,
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const currentWord = words[stateRef.current.wordIndex];
      const { text, isDeleting } = stateRef.current;

      if (!isDeleting) {
        if (text.length < currentWord.length) {
          stateRef.current.text = currentWord.substring(0, text.length + 1);
          setDisplayText(stateRef.current.text);
          timer = setTimeout(tick, 100);
        } else {
          stateRef.current.isDeleting = true;
          timer = setTimeout(tick, 2000);
        }
      } else {
        if (text.length > 0) {
          stateRef.current.text = currentWord.substring(0, text.length - 1);
          setDisplayText(stateRef.current.text);
          timer = setTimeout(tick, 50);
        } else {
          stateRef.current.isDeleting = false;
          stateRef.current.wordIndex = (stateRef.current.wordIndex + 1) % words.length;
          timer = setTimeout(tick, 500);
        }
      }
    };

    timer = setTimeout(tick, 100);

    return () => clearTimeout(timer);
  }, [words]);

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((prev) => !prev), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <p className="text-xl md:text-2xl font-bold text-gray-800 mt-2 h-8 flex items-center">
      {displayText}
      <span className={`${blink ? "opacity-100" : "opacity-0"} text-[#86c05a] font-light ml-1`}>|</span>
    </p>
  );
}