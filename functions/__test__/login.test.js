import { describe, expect, it } from '@jest/globals';
import * as dotenv from 'dotenv';

import login from '../apis/login.js';
dotenv.config();

describe('login', () => {
  it('should login with email and password', async () => {
    const user = await login(
      process.env.MYFIREBASE_EMAIL,
      process.env.MYFIREBASE_PASSWORD
    );
    expect(user.email).toBe(process.env.MYFIREBASE_EMAIL);
  });
  it('should not login with wrong email and password', async () => {
    const user = await login('wrong email', 'wrong password');
    expect(user).toBe(undefined);
  });
});
