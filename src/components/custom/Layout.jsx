import React from 'react'

export default function Layout({children}) {
  return (
    <div className=' h-[100%] w-full overflow-hidden '>
              {children}
    </div>
  )
}
