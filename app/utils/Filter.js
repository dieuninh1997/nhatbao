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
  const h = Math.abs(Math.round(duration / 3600));
  return h;
}

export {getDateTime, convertToLocalTime, getDiffHours};
