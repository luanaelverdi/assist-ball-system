import useWindowDimensions from '../hooks/useWindowDimensions'
import { Pantalla } from '../shared'
import { ScreenCardDesktop } from './ScreenCardDesktop'
import { ScreenCardMobile } from './ScreenCardMobile'

export const ScreenCard = ({
  screen
}: { screen: Pantalla }) => {
  const dimensions = useWindowDimensions()

  if (dimensions.width >= 800) 
    return <ScreenCardDesktop screen={screen} />

  return <ScreenCardMobile screen={screen} />
}