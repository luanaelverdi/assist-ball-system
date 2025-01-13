import { ComponentProps } from 'react'
import styles from '../styles/components/ButtonIcon.module.css'

interface ButtonIconProps extends ComponentProps<'button'>{
  handleOnClick: () => void;
}

export const ButtonIcon = ({
  handleOnClick,
  ...props
}: ButtonIconProps) => {
  return (
    <button className={styles.button} onClick={handleOnClick} {...props}>
      {props.children}
    </button>
  )
}