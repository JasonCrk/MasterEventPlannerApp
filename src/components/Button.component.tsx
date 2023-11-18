import { ButtonHTMLAttributes, FC } from 'react'

import {
  BootstrapColor,
  BootstrapColorOptions,
} from '../models/bootstrap.model'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  btnColor: BootstrapColorOptions
  children: string
}

const Button: FC<Props> = ({
  isLoading,
  children,
  btnColor,
  disabled,
  ...props
}) => {
  return (
    <button
      className={`btn btn-${btnColor || BootstrapColor.primary}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {children} {isLoading && <span>...</span>}
    </button>
  )
}

export default Button
