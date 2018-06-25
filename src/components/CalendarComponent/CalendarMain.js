import React from 'react'
import Calendar from './Calendar'
import CalendarHeader from './CalendarHeader'
// import CalendarRange from './CalendarRange'

/*Smart Component*/
class MainCalendar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            date:Date.now(),
            selectionStart: 0,
            selectionEnd: 0
        }
    }
    prevMonth = () => {
        let date = new Date(this.state.date)
        date.setMonth(date.getMonth() - 1)
        this.setState({date:date.getTime()})
    }
    nextMonth = () => {
        let date = new Date(this.state.date)
        date.setMonth(date.getMonth() + 1)
        this.setState({date:date.getTime()})
    }
    setRange = (selectionStart = 0, selectionEnd = 0) => {
        this.setState({selectionStart, selectionEnd})
    }
    render(){
       let {date, selectionStart, selectionEnd} = this.state
       return (<div className="calendar">
           {/* <CalendarRange dateFrom={selectionStart} dateTo={selectionEnd}/> */}
           <CalendarHeader
             date={date}
             prevMonth={this.prevMonth}
             nextMonth={this.nextMonth}
           />
           <Calendar
             date={date}
             indexStart = {selectionStart}
             indexEnd = {selectionEnd}
             setRange = {this.setRange}
             />
       </div>)
    }
}

export default MainCalendar
