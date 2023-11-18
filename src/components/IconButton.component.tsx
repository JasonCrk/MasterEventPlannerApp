import { ButtonHTMLAttributes, FC } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: JSX.Element
  roundedCircle?: boolean
}

const IconButton: FC<Props> = ({
  icon,
  roundedCircle,
  className,
  style,
  ...props
}) => {
  return (
    <button
      className={`btn ${roundedCircle && 'rounded-circle'} ${className}`}
      style={{
        padding: '5px 10px 8px 10px',
        textAlign: 'center',
        fontSize: style?.fontSize ? style.fontSize : '1.1rem',
      }}
      {...props}
    >
      {icon}
    </button>
  )
}

export default IconButton
