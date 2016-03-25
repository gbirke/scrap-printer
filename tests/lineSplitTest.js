import test from 'tape';
import lineSplit from '../src/lineSplit';

test('Empty strings returns empty line array', (assert) => {
  const expected = [];
  const actual = lineSplit( '' );

  assert.deepEqual(actual, expected);

  assert.end();
});

test('Strings with no newlines generate one line object', (assert) => {
  const expectedCount = 1;
  const expectedLine = 'Just a line for testing'
  const expectedColumnCount = 1;
  const splitted = lineSplit( 'Just a line for testing' );

  assert.equal( splitted.length, expectedCount, 'There should only be one return object' );
  assert.equal( splitted[0].$0, expectedLine, '$0 should contain the line text' );
  assert.equal( Object.keys( splitted[0] ).length, expectedColumnCount, 'line object should only contain line' );

  assert.end();
});

test('Lines with a given separator should be split into columns', (assert) => {
  const expectedColumnCount = 6;
  const expectedLine = 'Just a line for testing';
  const expectedWord = 'line';
  const splitted = lineSplit( 'Just a line for testing', ' ' );

  assert.equal( splitted[0].$0, expectedLine, '$0 should contain the line text' );
  assert.equal( Object.keys( splitted[0] ).length, expectedColumnCount, 'line object should contain line and separated columns' );
  assert.equal( splitted[0].$3, expectedWord, '$3 should contain a part of the line text' );

  assert.end();
});


test('Strings with newlines generate several line objects', (assert) => {
  const expectedCount = 3;
  const expectedFirstLine = 'Just a line for testing';
  const expectedLastLine = 'Three is magic';
  const splitted = lineSplit( 'Just a line for testing\nAnd another\nThree is magic' );

  assert.equal( splitted.length, expectedCount, 'There should be three return objects' );
  assert.equal( splitted[0].$0, expectedFirstLine );
  assert.equal( splitted[2].$0, expectedLastLine );

  assert.end();
});

test('Empty lines are skipped', (assert) => {
  const expectedCount = 3;
  const expectedFirstLine = 'Just a line for testing';
  const expectedLastLine = 'Three is magic';
  const splitted = lineSplit( 'Just a line for testing\n\nAnd another\nThree is magic\n' );

  assert.equal( splitted.length, expectedCount, 'There should be three return objects' );
  assert.equal( splitted[0].$0, expectedFirstLine );
  assert.equal( splitted[2].$0, expectedLastLine );

  assert.end();
});

test('All lines should be split into columns', (assert) => {
  const expectedFirstLineColumnCount = 6;
  const expectedLastLineColumnCount = 4;
  const expectedWord = 'line';
  const splitted = lineSplit( 'Just a line for testing\nAnd another line\nThree is magic', ' ' );

  assert.equal( Object.keys( splitted[0] ).length, expectedFirstLineColumnCount, 
 	'first line object should contain line and separated columns' );
  assert.equal( Object.keys( splitted[2] ).length, expectedLastLineColumnCount, 
  	'last line object should contain line and separated columns' );
  assert.equal( splitted[0].$3, expectedWord, '$3 should contain a part of the line text' );
  assert.equal( splitted[1].$3, expectedWord, '$3 should contain a part of the line text' );

  assert.end();
});


