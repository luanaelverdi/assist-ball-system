import { HomepageCards } from './HomepageCards'
import { Pantalla } from '../../shared'

export const HomepageContent = ({
    screens
}: { screens: Pantalla[] | null }) => {

    if (screens === null)
        return null

    return (
        <div className="homepage-content">
            <HomepageCards screens={screens} />
        </div>
    )
}