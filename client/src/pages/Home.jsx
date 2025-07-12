import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaShieldAlt, FaLanguage, FaBell } from "react-icons/fa";

export default function Home() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1 }
    );
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.4 }
    );
    gsap.fromTo(
      cardRefs.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.3, delay: 0.6 }
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-800 via-indigo-800 to-purple-900 text-white px-4 py-20">
      <h1
        ref={titleRef}
        className="text-5xl md:text-6xl font-extrabold tracking-tight text-center drop-shadow-xl"
      >
        Welcome to <span className="text-indigo-300">SafeChat</span>
      </h1>
      <p
        ref={subtitleRef}
        className="mt-6 max-w-2xl text-lg md:text-xl text-center font-light text-white/90"
      >
        A real-time, child-safe messaging app with AI abuse filter, instant translation, and privacy-first features.
      </p>

      {/* Feature Cards */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full px-4">
        {[
          {
            title: "AI Abuse Filter",
            icon: <FaShieldAlt size={28} className="text-indigo-400" />,
            desc: "Automatically blocks messages with inappropriate content using NLP filters.",
          },
          {
            title: "Instant Translation",
            icon: <FaLanguage size={28} className="text-indigo-400" />,
            desc: "Talk freely across languages. Your messages get translated in real-time.",
          },
          {
            title: "Message Alerts",
            icon: <FaBell size={28} className="text-indigo-400" />,
            desc: "Get notified about new messages and chats instantly, everywhere.",
          },
        ].map((card, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className="bg-white/10 backdrop-blur rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition transform duration-300"
          >
            <div className="mb-3">{card.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-white/80 text-sm">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
