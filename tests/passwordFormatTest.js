import test from 'tape';
import passwordFormat from '../src/passwordFormat';

test('Empty strings returns empty string', (assert) => {
  const expected = '';
  const actual = passwordFormat( '' );

  assert.deepEqual(actual, expected);

  assert.end();
});

test('lowercase chars are wrapped in class', (assert) => {
  const expected = '<span class="pw-lowercase">f</span><span class="pw-lowercase">o</span><span class="pw-lowercase">o</span>';
  const actual = passwordFormat( 'foo' );

  assert.deepEqual(actual, expected);

  assert.end();
});

test('uppercase chars are wrapped in class', (assert) => {
  const expected = '<span class="pw-uppercase">F</span><span class="pw-uppercase">O</span><span class="pw-uppercase">O</span>';
  const actual = passwordFormat( 'FOO' );

  assert.deepEqual(actual, expected);

  assert.end();
});

test('numeric chars are wrapped in class', (assert) => {
  const expected = '<span class="pw-number">1</span><span class="pw-number">2</span><span class="pw-number">3</span>';
  const actual = passwordFormat( '123' );

  assert.deepEqual(actual, expected);

  assert.end();
});

test('non-alphanumeric chars are wrapped in  class', (assert) => {
  const expected = '<span class="pw-other">.</span><span class="pw-other">;</span><span class="pw-other">+</span>';
  const actual = passwordFormat( '.;+' );

  assert.deepEqual(actual, expected);

  assert.end();
});