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
    this.shortMonthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
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
    let rangeMonthText = ''
    if (date) {
      rangeMonthText = this.shortMonthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
    }
    return (<tr className="calendar-summary-heading">
      <td className="calendar-summary-heading">
        <span>{rangeMonthText}</span>
     </td>
     </tr>
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
      {
        this.props.dateFrom
        ? <table>
            <tbody className="calendar-summary">
              <tr>
                <td className="calendar-summary">Start:</td>
                </tr>
            </tbody>
          </table>
          : null
      }

      {this.dumbDate(dateFrom)}
      {
        this.props.dateFrom
          ? <table>
              <tbody >
                <tr>
                  <td className="calendar-summary">End:</td>
                </tr>
              </tbody>
            </table>
          : null
      }
      {this.dumbDate(dateTo)}
    </div>)
  }
}

export default CalendarRange
