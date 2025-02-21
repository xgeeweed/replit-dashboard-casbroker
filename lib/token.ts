import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  role: string;
  company_id: string;
}

export const signJWT = (payload: TokenPayload): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      {
        expiresIn: '7d',
      },
      (err, token) => {
        if (err) reject(err);
        else resolve(token as string);
      }
    );
  });
};

export const verifyJWT = <T>(token: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.JWT_SECRET!,
      (err, payload) => {
        if (err) reject(err);
        else resolve(payload as T);
      }
    );
  });
}; 