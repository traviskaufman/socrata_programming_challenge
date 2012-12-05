/**
 * Command-Line interface for the Degree Rotation Amount Calculator.
 */
var degRotnAmtCalc = require('../index');

/**
 * Exports.
 */
module.exports = {
  /**
   * Run the CLI program.
   *
   * @param {Array<String>} argv
   *    Usually something like process.argv.
   *
   * @return {Integer}
   *    0 on success, 1 otherwise.
   *
   * @this module.exports
   */
  run: function(argv) {
    if (argv.length === 1 || argv[1] === '-h' || argv[1] === '--help') {
      this._printUsage();
      return 0;
    } else if (argv.length !== 3) { // Bad arguments
      console.error('Insufficient Arguments');
      this._printUsage();
      return 1;
    }

    var degreesToRotate = degRotnAmtCalc.getDegreeRotationAmt(argv[1],
                                                              argv[2]);

    if (degreesToRotate < 0) {
      // Some kind of error occured
      switch (degreesToRotate) {
        case degRotnAmtCalc.errCodes.E_FORMAT:
          console.error('Bad Time String(s). ' +
                     "Make sure they're formatted as [H]H:MM [AM|PM]");
          break;
        case degRotnAmtCalc.errCodes.E_INVALID:
          console.error('Invalid time.');
          break;
        default:
          break;
      }

      return 1;
    }

    var rotations = degreesToRotate / 360;
    var rotationSuffix = (rotations === 1) ? 'rotation' : 'rotations';
    console.dir(degreesToRotate + ' degrees (' + rotations +
                ' ' + rotationSuffix + ')');
    return 0;
  },

  /**
   * Print usage.
   *
   * @private
   */
  _printUsage: function() {
    console.dir('Usage: ' + process.argv[1] +
                ' [-h, --help] START_TIME DESIRED_TIME');
  }
};
