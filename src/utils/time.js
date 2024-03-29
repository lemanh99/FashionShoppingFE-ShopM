import moment from "moment";
import { useEffect, useState } from "react";

const msInSecond = 1000;
const msInMinute = 60 * 1000;
const msInAHour = 60 * msInMinute;
const msInADay = 24 * msInAHour;

const getPartsofTimeDuration = (duration) => {
  const days = Math.floor(duration / msInADay);
  const hours = Math.floor((duration % msInADay) / msInAHour);
  const minutes = Math.floor((duration % msInAHour) / msInMinute);
  const seconds = Math.floor((duration % msInMinute) / msInSecond);

  return { days, hours, minutes, seconds };
};

export const convert_datetime_from_timestamp = (timestamps) => {
  if (timestamps == null) return null;
  var a = new Date(timestamps);
  var year = a.getFullYear();
  var month = a.getMonth()+1;
  var date = a.getDate();
  var hour = a.getHours();
  var min = "0" + a.getMinutes();
  var sec = "0" + a.getSeconds();
  var time = date + '/' + month + '/' + year + ' ' + hour + ':' + min.substr(-2) + ':' + sec.substr(-2);
  return time;
}

export const convert_datetime_to_day = (datetime) => {
  if (datetime == null) return null;
  if(typeof datetime == 'object'){
    var year = datetime.getFullYear();
    var month = datetime.getMonth()+1;
    var day = datetime.getDate();
    var time = year + '-' + month + '-' + day;
    return time
  }
  if(typeof datetime=='number'){
    var a = new Date(datetime);
    var year = a.getFullYear();
    var month = a.getMonth()+1;
    var day = a.getDate();
    var time = year + '-' + month + '-' + day;
    return time
  }

  return datetime;
}

const Time = (endDateTime) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  let date_ = new Date();
  date_.setDate(date_.getDate() + 7);
  date_ = moment(date_).format("M-D-YYYY, 00:00:00");
  useEffect(() => {
    const timeout = setTimeout(() => {
      const date = new Date();
      setTime(date.toLocaleTimeString());
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [time]);
  const now = Date.now(); // Number of milliseconds from begining of time
  const future = new Date(endDateTime ? endDateTime : date_); // The day we leave for Japan
  const timeDif = future.getTime() - now;
  let timeParts = getPartsofTimeDuration(timeDif);
  timeParts.days = timeParts.days <= 9 ? `0${timeParts.days}` : timeParts.days;
  timeParts.minutes =
    timeParts.minutes <= 9 ? `0${timeParts.minutes}` : timeParts.minutes;
  timeParts.hours =
    timeParts.hours <= 9 ? `0${timeParts.hours}` : timeParts.hours;
  timeParts.seconds =
    timeParts.seconds <= 9 ? `0${timeParts.seconds}` : timeParts.seconds;
  return timeParts;
};
export default Time;
