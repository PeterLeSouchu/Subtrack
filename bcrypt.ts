import bcrypt from 'bcryptjs';

export default async function comparePassword(
  password: string,
  password2: string
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await bcrypt.compare(password2, hashedPassword);
}
