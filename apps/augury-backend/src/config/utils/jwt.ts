import jwt from 'jsonwebtoken';

/**
 * Signs a payload to create and return a JWT string
 * @param object Payload to sign
 * @param options Signing options (e.g. algorithm, expiresin)
 * @returns Signed JWT string
 */
function signJwt(object: object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, process.env.JWT_SECRET, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

/**
 * Decodes the passed JWT string into the original signed object
 * @param token JWT string (likely from `req.cookie`)
 * @returns Object containing validity, expiry, and the decoded vallue
 */
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
