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
          className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#86c05a]/20 rounded-full blur-[100px]" />

          <div className="relative overflow-hidden flex items-center justify-center mb-4">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter flex items-center"
            >
              Welcome to My Portfolio
              <span className="text-[#86c05a] text-5xl leading-none ml-1">.</span>
            </motion.div>
          </div>

          <div className="relative overflow-hidden mt-2 flex items-center justify-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-gray-500 flex items-center gap-3"
            >
              Loading Experience 
              <span className="text-[#86c05a] font-mono text-base font-bold min-w-[3ch]">
                {Math.min(progress, 100)}%
              </span>
            </motion.div>
          </div>

          <div className="mt-8 w-48 md:w-64 h-[2px] bg-gray-200 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute inset-y-0 left-0 bg-black rounded-full"
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