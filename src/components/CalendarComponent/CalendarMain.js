import React from 'react'
import Calendar from './Calendar'
import CalendarHeader from './CalendarHeader'

class MainCalendar extends React.Component {
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         date:Date.now(),
    //         selectionStart: 0,
    //         selectionEnd: 0
    //     }
    // }
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

    setRange = (selectionStart = 0, selectionEnd = 0) => {
        this.props.setRange(selectionStart, selectionEnd)
    }

    render(){
       return (<div className="calendar">
           <CalendarHeader
             date={this.props.date}
             prevMonth={this.prevMonth}
             nextMonth={this.nextMonth}
           />
           <Calendar
             date={this.props.date}
             indexStart = {this.props.selectionStart}
             indexEnd = {this.props.selectionEnd}
             setRange = {this.setRange}
             />
       </div>)
    }
}

export default MainCalendar
