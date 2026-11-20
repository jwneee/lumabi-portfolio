import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.floor(Math.random() * 10) + 1
      })
    }, 150)

    const timer = setTimeout(() => {
      setIsLoading(false)
      document.body.style.overflow = "unset"
    }, 2500)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
      document.body.style.overflow = "unset"
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-[#f8fdfa] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Mesh Gradient Background for Loader */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[#a8e6cf] rounded-full mix-blend-multiply filter blur-[120px] opacity-60 animate-pulse" style={{ animationDuration: '8s' }}></div>
            <div className="absolute -top-[10%] right-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[#fff9c4] rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse" style={{ animationDuration: '9s', animationDelay: '1s' }}></div>
            <div className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-[#c8e6c9] rounded-full mix-blend-multiply filter blur-[120px] opacity-60 animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }}></div>
          </div>

          <div className="relative overflow-hidden flex items-center justify-center mb-4 z-10">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl text-gray-900 tracking-tight flex items-center text-center px-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Welcome to My <span className="italic ml-2">Portfolio</span>
              <span className="text-[#5a9e5b] text-5xl leading-none ml-1">.</span>
            </motion.div>
          </div>

          <div className="relative overflow-hidden mt-2 flex items-center justify-center z-10">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-gray-600 flex items-center gap-3"
            >
              Loading Experience 
              <span className="text-[#5a9e5b] font-mono text-base font-bold min-w-[3ch]">
                {Math.min(progress, 100)}%
              </span>
            </motion.div>
          </div>

          <div className="mt-8 w-48 md:w-64 h-[2px] bg-gray-300/50 rounded-full overflow-hidden relative z-10">
            <motion.div
              className="absolute inset-y-0 left-0 bg-[#5a9e5b] rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}