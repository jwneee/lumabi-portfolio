import { useState } from "react";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "ma.cecilialumabi@gmail.com";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <footer id="contact" className="w-full pt-20 pb-8 px-6 bg-white">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        
        {/* Big Title */}
        <h2 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-4">
          Let's <span className="italic">Connect!</span>
        </h2>
        
        {/* Subtitle */}
        <p className="text-gray-500 text-sm mb-10 max-w-md">
          Feel free to reach out for collaborations or just a friendly hello.
        </p>

        {/* Contact Info / Social Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
          
          {/* Email Button (Click to copy) */}
          <button 
            onClick={copyEmail}
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-white shadow-sm ring-1 ring-black/5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all"
          >
            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            {copied ? "Email copied!" : email}
          </button>

          {/* GitHub Button */}
          <a 
            href="https://github.com/jwneee" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-white shadow-sm ring-1 ring-black/5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all"
          >
            <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            github.com/jwneee
          </a>

          {/* LinkedIn Button */}
          <a 
            href="https://linkedin.com/in/mariacecilialumabi" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-white shadow-sm ring-1 ring-black/5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all"
          >
            <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            LinkedIn
          </a>

          {/* Personal Instagram Button */}
          <a 
            href="https://instagram.com/jwn.ee" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-white shadow-sm ring-1 ring-black/5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all"
          >
            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            @jwn.ee
          </a>

        </div>

        {/* "Click to copy" Note */}
        <p className="mt-5 text-xs text-gray-400">
          Click the email to copy it.
        </p>

        {/* Copyright */}
        <div className="w-full pt-12 mt-12 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center">
            © {new Date().getFullYear()} Lumabi Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}