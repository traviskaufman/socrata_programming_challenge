/**
 * index.js
 *
 * Contains the business logic for calculating the number of degrees needed to
 * rotate a minute hand from an initial time t1 such that such that the clock
 * now displays a desired new time t2.
 */

/**
 * This module wraps the main function for performing the
 * aforementioned calculation.
 */
module.exports = {
 /**
  * Does what's described in the file header.
  *
  * @param {String} originalTime
  *     A string representing a time in "[H]H:MM (AM|PM)" format that serves as
  *     the starting time displayed on the clock.
  *
  * @param {String} desiredTime
  *     Same format as originalTime. Represents the time you wish the clock to
  *     show.
  *
  * @return {Integer}
  *    The number of degrees necessary to rotate the minute hand so that the
  *    clock gets set to the desired time, or -1 if either times were invalid.
  *
  * @this module.exports
  */
  getDegreeRotationAmt: function(originalTime, desiredTime) {
    /** @const **/
    var EINVALID = -1;

    var originalTimeArray = this._parseTime(originalTime);
    var desiredTimeArray = this._parseTime(desiredTime);

    // Make sure the times strings were valid
    if (!originalTimeArray || !desiredTimeArray) {
      return EINVALID;
    }

    var originalRawMinutes = this._toRawMinutes(originalTimeArray);
    var desiredRawMinutes = this._toRawMinutes(desiredTimeArray);

    // Make sure that the time ranges are valid. E.g. the user doesn't specify
    // "56:99 PM". Not really necessary but nice to have.
    if (!this._getIsTimeValid(originalRawMinutes) ||
        !this._getIsTimeValid(desiredRawMinutes)) {
      return EINVALID;
    }

    // Calculate the absolute difference between times
    var minutesDifference = Math.abs(originalRawMinutes - desiredRawMinutes);
    // Take into account whether or not the clock will have to wrap around.
    if (originalRawMinutes > desiredRawMinutes) {
      minutesDifference = this._constants.MINUTES_PER_DAY - minutesDifference;
    }

    return minutesDifference * this._constants.DEGREES_PER_MINUTE;
  },

  /**
   * Constants used to assist in the calculation.
   *
   * @const
   *
   * @private
   */
  _constants: {
    MINUTES_PER_DAY: 1440, // 24 * 60

    DEGREES_PER_MINUTE: 6, // Amt of degrees minute hand has to rotate per min.

    MAX_RAW_MINUTES: 1439, // "11:59 PM" -> toRawMinutes

    MIN_RAW_MINUTES: 0, // "12:00 AM" -> toRawMinutes

    AM: 'AM',

    PM: 'PM'
  },

  /**
   * Ensures a given time is valid by observing its raw minutes.
   *
   * @param {Integer} rawMinutes
   *    The time value converterd to raw minutes.
   *
   * @return {Boolean}
   *    true if valid, false otherwise.
   *
   * @private
   *
   * @see toRawMinutes
   *
   * @this module.exports
   */
  _getIsTimeValid: function(rawMinutes) {
    return ((rawMinutes >= this._constants.MIN_RAW_MINUTES) &&
            (rawMinutes <= this._constants.MAX_RAW_MINUTES));
  }

  /**
   * Takes a time string "[H]H:MM (AM|PM)" and returns a triple containing the
   * hours, minutes, and the 'AM' or 'PM' components of the time string.
   *
   * @param {String} timeStr
   *    The time string.
   *
   * @return {Object | null}
   *    An object containing the hours, minutes, and meridian ('AM' | 'PM'), or
   *    null if the timeStr is invalid.
   *
   * @private
   */
  _parseTime: function(timeStr) {
    var timeRE = /(\d{1,2})\:(\d{2})\s{0,1}(AM|PM)/;
    var timeArray = timeStr.match(timeRE).slice(1, 4);
    if (timeArray.length !== 3) {
      return null;
    }
    return {
      hours: parseInt(timeArray[0], 10),
      minutes: parseInt(timeArray[1], 10),
      meridian: timeArray[2]
    };
  },

  /**
   * Convert a time object from _parseTime to raw minutes.
   *
   * @param {Object} time
   *    Object representing a current time returned from _parseTime.
   *
   * @return {Integer}
   *    The amount of minutes into the day this time represents.
   *
   * @private
   *
   * @see _parseTime
   *
   * @this module.exports
   */
  _toRawMinutes: function(time) {
    var offset = (time.meridian === this._constants.PM) ? 12 : 0;
    var hoursInMinutes = ((time.hours % 12) + offset) * 60;
    return (hoursInMinutes + time.minutes);
  }
};
