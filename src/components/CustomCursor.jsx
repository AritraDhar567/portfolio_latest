import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  // Fast main cursor
  const springConfig = { damping: 28, stiffness: 500, mass: 0.3 }
  // Slower, heavier trail ring
  const trailConfig = { damping: 35, stiffness: 180, mass: 1 }

  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)
  const trailX = useSpring(cursorX, trailConfig)
  const trailY = useSpring(cursorY, trailConfig)

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleHoverIn = () => setIsHovering(true)
    const handleHoverOut = () => setIsHovering(false)
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    const attachListeners = () => {
      const interactables = document.querySelectorAll('a, button, [data-cursor], input, textarea')
      interactables.forEach(el => {
        el.addEventListener('mouseenter', handleHoverIn)
        el.addEventListener('mouseleave', handleHoverOut)
      })
      return interactables
    }

    const interactables = attachListeners()
    // Re-attach on DOM change for dynamic elements
    const observer = new MutationObserver(() => attachListeners())
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverIn)
        el.removeEventListener('mouseleave', handleHoverOut)
      })
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Outer ring — slow trail */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: trailX, y: trailY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          animate={{
            width: isHovering ? 52 : 36,
            height: isHovering ? 52 : 36,
            borderColor: isHovering ? '#FFD600' : '#0A0A0F',
            borderWidth: isHovering ? '4px' : '3px',
            rotate: isClicking ? 45 : 0,
          }}
          transition={{ type: 'spring', damping: 22, stiffness: 280 }}
          style={{
            borderStyle: 'solid',
            borderRadius: isHovering ? '0px' : '50%',
          }}
        />
      </motion.div>

      {/* Inner dot — fast and precise */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          animate={{
            width: isClicking ? 5 : isHovering ? 10 : 8,
            height: isClicking ? 5 : isHovering ? 10 : 8,
            backgroundColor: isHovering ? '#FFD600' : '#0A0A0F',
            borderRadius: isHovering ? '0px' : '50%',
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 500 }}
        />
      </motion.div>
    </>
  )
}
