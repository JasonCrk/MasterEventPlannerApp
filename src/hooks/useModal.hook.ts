import { useState } from 'react'

interface UseModal {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  toggleOpen: () => void
}

export const useModal = (): UseModal => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)
  const toggleOpen = () => setIsOpen(prevValue => !prevValue)

  return {
    isOpen,
    onOpen,
    onClose,
    toggleOpen,
  }
}
