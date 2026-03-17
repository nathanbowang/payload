import React from 'react'

import './index.scss'

export const TableViewIcon = ({
  className,
  color,
}: {
  className?: string
  color?: 'dark' | 'default' | 'muted'
}) => {
  const colorClass = color ? `icon--table-view--${color}` : ''

  return (
    <svg
      className={[className, 'icon icon--table-view', colorClass].filter(Boolean).join(' ')}
      fill="currentColor"
      height="20"
      viewBox="0 0 16 16"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 10.4078H5.27273V13H2.90874C2.30955 12.9998 2 12.6052 2 12.3207V10.4078ZM5.27273 9.29666H2V6.70334H5.27273V9.29666ZM14 9.29666H6.36364V6.70334H14V9.29666ZM14 12.3207C14 12.6052 13.6905 12.9998 13.0913 13H6.36364V10.4078H14V12.3207ZM2 3.67925C2 3.39484 2.30955 3.00016 2.90874 3H5.27273V5.59223H2V3.67925ZM14 5.59223H6.36364V3H13.0913C13.6905 3.00016 14 3.39484 14 3.67925V5.59223Z" />
    </svg>
  )
}
