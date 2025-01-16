import { useMemo } from 'react'

export const HomepageHeader = ({
  roleName
}: { roleName: string }) => {
  const component = useMemo(() => {
    switch (roleName){
    case 'admin': 
      break
    case 'dt':
      break
    case 'player':
      break
    }
  }, [ roleName ])

  console.log(component)

  return (
    <div className="homepage-header-container">
      <div>
        <p>hOLIS</p>
      </div>
    </div>
  )
}