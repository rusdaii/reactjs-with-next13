import jwt from 'jsonwebtoken';

export async function generateToken(id) {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
  return token;
}
