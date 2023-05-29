import { useState, useEffect } from 'react';
import { format, addDays, subDays, eachDayOfInterval } from 'date-fns';
import styles from "./CalendarTask.module.scss"
import Day from '../Day/Day';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startSwipe, setStartSwipe] = useState(null);
  const [days, setDays] = useState([]);

  useEffect(() => {
    const start = subDays(currentDate, 3);
    const end = addDays(currentDate, 3);
    const daysOfMonth = eachDayOfInterval({ start, end });
    setDays(daysOfMonth);
  }, [currentDate]);

  const handleTouchStart = (event) => {
    setStartSwipe(event.touches[0].clientX);
  };

  const handleTouchMove = (event) => {
    if (!startSwipe) {
      return;
    }

    let touchMove = event.touches[0].clientX;
    const touchDifference = startSwipe - touchMove;

    if (Math.abs(touchDifference) > 100) { // Detects a long swipe
      if (touchDifference > 0) {
        setCurrentDate(addDays(currentDate, 1)); // Swipe right
      } else {
        setCurrentDate(subDays(currentDate, 1)); // Swipe left
      }
      setStartSwipe(null);
    }
  };

  const handleTouchEnd = () => {
    setStartSwipe(null);
  };

  const handlePreviousDay = () => {
    setCurrentDate(subDays(currentDate, 1)); // Go to previous day
  };

  const handleNextDay = () => {
    setCurrentDate(addDays(currentDate, 1)); // Go to next day
  };

  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <div className={styles['calendar-container']}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button className={styles['calendar-week-btn']} onClick={handlePreviousDay}>{"<"}</button>
      {days.map((day, index) => (
        <div key={index}>
          <Day nameDay={daysOfWeek[day.getDay()]} numberDay={format(day, 'd')} />
          {/* {daysOfWeek[day.getDay()]} {format(day, 'd')} */}
        </div>
      ))}
      <button className={styles['calendar-week-btn']} onClick={handleNextDay}>{">"}</button>
    </div>
  );
};

export default Calendar;
