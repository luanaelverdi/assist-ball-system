import { useMemo } from 'react'

export const HomepageHeader = ({
  roleName
}: { roleName: string }) => {
  const component = useMemo(() => {
    switch (roleName) {
      case 'ADMIN':
        break
      case 'DT':
        break
      case 'PLAYER':
        break
    }
  }, [roleName])

  console.log(component)

  return (
    <div className="homepage-header-container">
      <div>
        <h1>Juventud Unida</h1>
      </div>

    </div>
  )
}