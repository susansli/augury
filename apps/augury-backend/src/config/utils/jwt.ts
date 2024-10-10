import jwt from 'jsonwebtoken';

function signJwt(object: object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, process.env.JWT_SECRET, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_PUBLIC);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    };
  }
}

export default module.exports = {
  signJwt,
  verifyJwt,
};
