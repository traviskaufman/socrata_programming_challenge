/**
 * CLI Specs.
 */
var cli = require('../lib/cli');

describe('The Command-Line Interface', function() {
  var usageSpy;
  var consoleSpy;
  var args;

  beforeEach(function() {
    usageSpy = spyOn(cli, '_printUsage');
    args = ['rotation-amt'];
  });

  it('prints a usage message when run with no arguments', function() {
    cli.run(args);
    expect(usageSpy).toHaveBeenCalled();
  });

  it('prints a usage message when called with "-h"', function() {
    cli.run(args.push('-h'));
    expect(usageSpy).toHaveBeenCalled();
  });

  it('prints a usage message when called with "--help"', function() {
    cli.run(args.push('--help'));
    expect(usageSpy).toHaveBeenCalled();
  });

  it('complains if arguments are insufficient', function() {
    consoleSpy = spyOn(console, 'error');
    cli.run(args.push('bogus'));
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.reset();
  });

  it("complains if times aren't formatted correctly", function() {
    consoleSpy = spyOn(console, 'error');
    cli.run(args.concat(['10:45 AM', 'bogus']));
    expect(consoleSpy).toHaveBeenCalled();
  });

  it("complains if time doesn't exist", function() {
    consoleSpy = spyOn(console, 'error');
    cli.run(args.concat(['9:00 PM', '20:00 AM']));
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('displays how many degrees and rotations were necessary', function() {
    var expected = '900 degrees (2.5 rotations)';
    consoleSpy = spyOn(console, 'dir');
    cli.run(args.concat(['10:15 AM', '12:45 PM']));
    expect(consoleSpy).toHaveBeenCalledWith(expected);
  });
});
