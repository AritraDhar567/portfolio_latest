import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const trailConfig = { damping: 40, stiffness: 150, mass: 0.8 }

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

    const interactables = document.querySelectorAll('a, button, [data-cursor]')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', handleHoverIn)
      el.addEventListener('mouseleave', handleHoverOut)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverIn)
        el.removeEventListener('mouseleave', handleHoverOut)
      })
    }
  }, [])

  return (
    <>
      {/* Trail ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isHovering ? 48 : 32,
            height: isHovering ? 48 : 32,
            borderColor: isHovering ? 'rgba(247, 37, 133, 0.8)' : 'rgba(0, 212, 255, 0.5)',
            scale: isClicking ? 0.8 : 1,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          style={{
            borderRadius: '50%',
            border: '1px solid rgba(0, 212, 255, 0.5)',
          }}
        />
      </motion.div>

      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isClicking ? 6 : 8,
            height: isClicking ? 6 : 8,
            backgroundColor: isHovering ? '#f72585' : '#00d4ff',
            boxShadow: isHovering
              ? '0 0 15px #f72585, 0 0 30px rgba(247,37,133,0.5)'
              : '0 0 15px #00d4ff, 0 0 30px rgba(0,212,255,0.5)',
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 400 }}
          style={{ borderRadius: '50%' }}
        />
      </motion.div>
    </>
  )
}
