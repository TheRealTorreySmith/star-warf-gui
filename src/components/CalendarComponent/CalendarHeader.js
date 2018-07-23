import React from 'react'
import './Calendar.css'

/* HEADER OF CALENDAR */
class CalendarHeader extends React.Component {
    constructor(props) {
        super(props)
        this.monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"]
        this.dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
    }
    shouldComponentUpdate(nextProps){
        return nextProps.date !== this.props.date
    }
    render() {
        let date  = new Date(this.props.date)
        return (<div className="calendar__header">
            <div className="month-year-choosers">
              <div className="calendar__month-chooser">
                <span className="calendar__prev-month" onClick={this.props.prevMonth}>❮</span>
                <span>{this.monthNames[date.getMonth()]}</span>
                <span className="calendar__next-month" onClick={this.props.nextMonth}>❯</span>
              </div>
              <div  className="calendar__year-chooser">
                <span className="calendar__prev-year" onClick={this.props.prevYear}>❮</span>
                <span>{date.getFullYear()}</span>
                <span className="calendar__next-year" onClick={this.props.nextYear}>❯</span>
              </div>
            </div>
            <table className="calendar__days-names" cellSpacing="0">
              <tbody>
                <tr>
                  {this.dayNames.map((i, key)=> <td className="calendar__day-name" key={key}>{i}</td>)}
                </tr>
              </tbody>
            </table>
        </div>)
    }
}

export default CalendarHeader
