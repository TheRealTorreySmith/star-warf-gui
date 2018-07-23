import React from 'react'
import Calendar from './Calendar'
import CalendarHeader from './CalendarHeader'

class MainCalendar extends React.Component {
    prevMonth = () => {
        let date = new Date(this.props.date)
        date.setMonth(date.getMonth() - 1)
        this.props.prevMonth(date)
    }

    nextMonth = () => {
        let date = new Date(this.props.date)
        date.setMonth(date.getMonth() + 1)
        this.props.nextMonth(date)
    }

    prevYear = () => {
        let date = new Date(this.props.date)
        date.setYear(date.getFullYear() - 1)
        this.props.prevYear(date)
    }

    nextYear = () => {
        let date = new Date(this.props.date)
        date.setYear(date.getFullYear() + 1)
        this.props.nextYear(date)
    }

    setRange = (selectionStart = 0, selectionEnd = 0) => {
        this.props.setRange(selectionStart, selectionEnd)
    }

    hourButtonBackward = () => {
      let hour = this.props.hourSelected - 1
      let hourTranslation = this.props.hourTranslation + 32
      if (this.props.hourSelected !== 0) {
        this.props.hoursChange(hour)
        this.props.hourTranslationChange(hourTranslation)
      }
    }

    hourButtonForward = () => {
      let hour = this.props.hourSelected + 1
      let hourTranslation = this.props.hourTranslation - 32
      if (this.props.hourSelected !== 23) {
        this.props.hoursChange(hour)
        this.props.hourTranslationChange(hourTranslation)
      }
    }

    calendarHoursOptions = (hour) => {
      let hours = []
      const hourStyles = {
        transform: `translateX(${this.props.hourTranslation}px)`
      }
      let hoursToShow = [this.props.hourSelected-1, this.props.hourSelected, this.props.hourSelected+1]
      for (var i = 0; i < 24; i++) {
        hours.push(i)
      }
      return hours.map(x =>
        <div key={x} ref={x} style={hourStyles}
          className={`numbers calendar-hours-numbers-container ${!hoursToShow.includes(x) ? '' : x === this.props.hourSelected ? 'active' : ''}`}>
          <div className="calendar-hours-numbers">
            {x}
          </div>
        </div>
      )
    }

    render(){
       return (<div className="calendar">
           <CalendarHeader
             date={this.props.date}
             prevMonth={this.prevMonth}
             nextMonth={this.nextMonth}
             prevYear={this.prevYear}
             nextYear={this.nextYear}
           />
           <Calendar
             date={this.props.date}
             indexStart={this.props.selectionStart}
             indexEnd={this.props.selectionEnd}
             setRange={this.setRange}
             />
             <div className="calendar-hours-container">
               <div className="calendar-hours">
                 Hours =
               </div>
               <button className="calendar-hour-button calendar-hour-backward" onClick={() => this.hourButtonBackward()}>
                 <i className="material-icons">chevron_left</i>
               </button>
               <div  className="calendar-hours-options">
                 {this.calendarHoursOptions()}
               </div>
               <button className="calendar-hour-button calendar-hour-forward" onClick={() => this.hourButtonForward()}>
                 <i className="material-icons">chevron_right</i>
               </button>
             </div>

       </div>)
    }
}

export default MainCalendar
