import test from 'tape';
import passwordFormat from '../src/passwordFormat';

test('Empty strings returns empty string', (assert) => {
  const expected = '';
  const actual = passwordFormat( '' );

  assert.deepEqual(actual, expected);

  assert.end();
});

test('lowercaseCharsGetClasses', (assert) => {
  const expected = '<span class="pw-lowercase">f</span><span class="pw-lowercase">o</span><span class="pw-lowercase">o</span>';
  const actual = passwordFormat( 'foo' );

  assert.deepEqual(actual, expected);

  assert.end();
});

test('uppercaseCharsGetClasses', (assert) => {
  const expected = '<span class="pw-uppercase">F</span><span class="pw-uppercase">O</span><span class="pw-uppercase">O</span>';
  const actual = passwordFormat( 'FOO' );

  assert.deepEqual(actual, expected);

  assert.end();
});
