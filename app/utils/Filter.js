import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';

function getDateTime(timestamp) {
  return moment.unix(timestamp).format('DD-MM-YYYY HH:mm:ss');
}

function convertToLocalTime(date) {
  if (date == null) {
    return '--';
  }
  var dateFormat = 'DD-MM-YYYY HH:mm:ss';
  var testDateUtc = moment.utc(date);
  var localDate = testDateUtc.local();
  return localDate.format(dateFormat);
}

function getDiffHours(date) {
  const dd = new Date(date * 1000);
  const today = new Date();
  const duration = (today.getTime() - dd.getTime()) / 1000;
  const m = Math.abs(Math.round(duration / 60));
  const h = Math.abs(Math.round(duration / 3600));
  const d = Math.abs(Math.round(h / 24));
  if (h >= 24) {
    return `${d} days`;
  } else if (h > 0 && h <= 24) {
    return `${h} hours`;
  } else {
    return `${m} minutes`;
  }
}

export {getDateTime, convertToLocalTime, getDiffHours};
