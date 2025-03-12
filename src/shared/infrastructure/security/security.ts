import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

const SALT_OR_ROUNDS = 10;

export const HashText = async (text: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_OR_ROUNDS);
  return await bcrypt.hash(text, salt);
};

export const CompareHash = async (
  text: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(text, hash);
};

export const HashFile = (file: string): string => {
  return crypto.createHash('sha256').update(file).digest('hex');
};

export const fileSize = (base64String: string): number => {
  const base64WithoutPrefix = base64String.replace(/^data:.*;base64,/, '');
  const padding = (base64WithoutPrefix.match(/=+$/) || [''])[0].length;
  return (base64WithoutPrefix.length * 3) / 4 - padding;
};

export const fileMimeType = (base64String: string): string => {
  const matches = base64String.match(/^data:([^;]+);base64,/);
  if (!matches) return '';
  return matches[1];
};
