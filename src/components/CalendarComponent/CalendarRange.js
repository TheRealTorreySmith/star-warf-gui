import React from 'react'
import './Calendar.css'


class CalendarRange extends React.Component {
  constructor(props) {
    super(props)
    this.monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
    this.daysNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]
  }
  dateInfo(date) {
    // let dateRow
    let rangeMonthText = ''
    if (date) {
      // dateRow = <td rowSpan="2">
      //   <span className="calendar__range-date">{date.getDate()}</span>
      // </td>
      rangeMonthText = this.monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
    }
    // return (<tr>
    //   {/* {dateRow} */}
    //   <td className="td-calendar-range">
    //     <span className="calendar__range-month">
    //       {rangeMonthText}
    //     </span>
    //   </td>
    // </tr>)
    return (
      <table>
        <tbody className="calendar-summary-heading">
          {rangeMonthText}
        </tbody>
      </table>
    )
  }
  dumbDate(date, title) {
    return (<div className="calendar__from-date">
      <table>
        <tbody className="calendar-summary">
          {this.dateInfo(date)}
        </tbody>
      </table>
    </div>)
  }
  render() {
    let {dateFrom, dateTo} = this.props
    dateTo = dateTo
      ? new Date(dateTo)
      : dateTo
    dateFrom = dateFrom
      ? new Date(dateFrom)
      : dateFrom
    return (<div className="calendar__range">
      <table>
        <tbody className="calendar-summary">
          <div>Start:</div>
        </tbody>
      </table>
      {this.dumbDate(dateFrom)}
      <table>
        <tbody className="calendar-summary">
          <div>End:</div>
        </tbody>
      </table>
      {this.dumbDate(dateTo)}
    </div>)
  }
}

export default CalendarRange
