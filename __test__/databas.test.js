import { describe, expect, it } from '@jest/globals';

import {
  getData,
  setData,
  updateBookData,
  deleteData
} from '../apis/database.js';

describe('database', () => {
  it('should set data to database', async () => {
    const userId = 'test';
    const data = await setData(userId, {
      books: ['https://nhentai.net/g/123456/']
    });
    expect(data).toEqual(undefined);
  });
  it('should update data to database', async () => {
    const userId = 'test';
    const data = await updateBookData(userId, [
      'https://nhentai.net/g/123457/'
    ]);
    expect(data).toEqual(undefined);
  });

  it('should get data from database', async () => {
    const userId = 'test';
    const data = await getData(userId);
    expect(data).toEqual({ books: ['https://nhentai.net/g/123456/'] });
  });
  it('should delete data from database', async () => {
    const userId = 'test';
    const data = await deleteData(userId);
    expect(data).toEqual(undefined);
  });
});
