import { useEffect, useState } from 'react'

function useKeyPress(targetKey: string) {
  const [keyPressed, setKeyPressed] = useState<boolean>(false)
  useEffect(() => {
    function downHandler({ key }: { key: string }) {
      if (key === targetKey) {
        setKeyPressed(true)
      }
    }
    const upHandler = ({ key }: { key: string }) => {
      if (key === targetKey) {
        setKeyPressed(false)
      }
    }
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [targetKey])
  return keyPressed
}

export default useKeyPress
