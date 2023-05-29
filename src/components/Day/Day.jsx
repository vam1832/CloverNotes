import React from 'react'
import styles from './Day.module.scss'

const Day = ({nameDay, numberDay}) => {
  return (
    <div className={styles['day-container']}>
        <p className={styles['name-day']}>{nameDay}</p>
        <p className={styles['number-day']}>{numberDay}</p>
        <p>•</p>
    </div>
  )
}

export default Day