import { describe, expect, it } from '@jest/globals';

import parser from '../helpers/parser.js';

describe('parser', () => {
  it('should return an array of urls', () => {
    const numbers = '123456 354321';
    const urls = parser(numbers);
    expect(urls).toEqual([
      'https://nhentai.net/g/123456/',
      'https://nhentai.net/g/354321/'
    ]);
  });
  it('should return an array of urls if it with \n', () => {
    const numbers = '123456\n354321';
    const urls = parser(numbers);
    expect(urls).toEqual([
      'https://nhentai.net/g/123456/',
      'https://nhentai.net/g/354321/'
    ]);
  });
  it('should return an error message if the number is not valid', () => {
    const numbers = '123456 354321 123';
    const urls = parser(numbers);
    expect(urls).toEqual([
      'https://nhentai.net/g/123456/',
      'https://nhentai.net/g/354321/',
      'not a valid number'
    ]);
  });
  it('should return an error message if there is NaN in the string', () => {
    const numbers = '123456 354321 123a';
    const urls = parser(numbers);
    expect(urls).toEqual([
      'https://nhentai.net/g/123456/',
      'https://nhentai.net/g/354321/',
      'not a valid number'
    ]);
  });
});
