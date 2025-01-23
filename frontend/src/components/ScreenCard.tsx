import { Pantalla } from '../shared'
import { ScreenCardMobile } from './ScreenCardMobile'

export const ScreenCard = ({
  screen
}: { screen: Pantalla }) => {

  return <ScreenCardMobile screen={screen} />
}