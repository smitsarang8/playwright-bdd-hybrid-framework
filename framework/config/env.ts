import "dotenv/config";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const ENV = {
  baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
  headless: process.env.HEADLESS === 'true',
  standardUsername: requireEnv('STANDARD_USER_USERNAME'),
  standardPassword: requireEnv('STANDARD_USER_PASSWORD'),
  lockedOutUsername: requireEnv('LOCKED_OUT_USER_USERNAME'),
  lockedOutPassword: requireEnv('LOCKED_OUT_USER_PASSWORD'),
};