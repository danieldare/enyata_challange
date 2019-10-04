import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

/**
 * JWT Service Module
 *
 * @export
 * @class JWTService
 */
export default class JWTService {
  /**
   * Synchronously sign the given payload into a JSON Web Token string payload
   *
   * @static
   * @param {object} payload - Payload to sign
   * @param {object} opts - Options for signature
   * @returns {string} A JSON Web Token string
   * @memberof JWTService
   */
  static sign(payload) {
    const options = { 
      issuer:  "Mysoft corp",
      subject:  "subject",
      audience:  "audience",
      expiresIn: "12h",
    };

    // return jwt.sign(payload, privateKey, options);

   return jwt.sign(payload, process.env.PRIVATE_KEY ,options);
  }

  /**
   * Synchronously verify given token and return a decoded token
   *
   * @static
   * @param {string} token - JWT string to verify
   * @param {object} opts - Options for the verification
   * @returns {object|boolean} Decoded token payload or false for invalid token
   * @memberof JWTService
   */
  static verifyToken(token) {
    const options = {
      issuer:  "Mysoft corp",
      subject:  "subject",
      audience:  "audience",
      expiresIn: '12h',
    };

    try {
      return jwt.verify(token, process.env.PRIVATE_KEY , options);
    } catch (err) {
      return false;
    }
  }

  

  /**
   * A wrapper that returns the decoded payload without verifying if the signature is valid
   *
   * @static
   * @param {string} token - JWT string to decode
   * @returns {object} The decoded payload
   * @memberof JWTService
   */
  static decode(token) {
    return jwt.decode(token, { complete: true });
  }
}