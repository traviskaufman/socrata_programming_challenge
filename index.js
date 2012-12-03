/**
 * index.js
 *
 * Contains the business logic for calculating the number of degrees needed to
 * rotate a minute hand from an initial time t1 such that such that the clock
 * now displays a desired new time t2.
 */

/**
 * This module wraps the main function for performing the
 * aforementionedCalculation
 *
 * @this module.exports
 *
 * @return {Integer}
 *    The number of degrees necessary to ... TODO: Finish.
 */
module.exports = {
  //TODO: JsDoc
  getDegreeRotationAmt: function(originalTime, desiredTime) {
    var originalTimeArray = this._parseTime(originalTime); // [Hrs, Mins, AM|PM]
    var desiredTimeArray = this._parseTime(desiredTime);
    var originalRawMinutes = this._toRawMinutes(originalTimeArray);
    var desiredRawMinutes = this._toRawMinutes(desiredTimeArray);
    // TODO: Check that raw minutes fall in between minimum and maximum
    // allowable minutes

    var minutesDifference = Math.abs(originalRawMinutes - desiredRawMinutes);
    if (originalRawMinutes > desiredRawMinutes) {
      // Wrap it around the clock
      minutesDifference = this._constants.MINUTES_PER_DAY - minutesDifference;
    }

    return minutesDifference * this._constants.DEGREES_PER_MINUTE;
  },

  //TODO: Dox
  _parseTime: function(timeStr) {
    var timeRE = /(\d{1,2})\:(\d{2})\s{0,1}(AM|PM)/;
    var timeArray = timeStr.match(timeRE).slice(1, 4);
    // Convert hours and minutes to number values
    for (var i = 0, l = timeArray.length - 1; i < l; i++) {
      timeArray[i] = parseInt(timeArray[i], 10);
    }
    return timeArray;
  },

  _constants: {
    MINUTES_PER_DAY: 1440, // 24 * 60

    DEGREES_PER_MINUTE: 6,

    AM: 'AM',

    PM: 'PM'
  },

  _toRawMinutes: function(timeArray) {
    var hours = timeArray[0],
        minutes = timeArray[1],
        amPm = timeArray[2];
    var offset = (amPm === this._constants.PM) ? 12 : 0;
    var hoursInMinutes = ((hours % 12) + offset) * 60;
    return (hoursInMinutes + minutes);
  }
};
