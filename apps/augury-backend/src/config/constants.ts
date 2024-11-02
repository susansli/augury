export const CLIENT_PORT = process.env.CLIENT_PORT || 4200;
export const CLIENT_URL =
  process.env.CLIENT_URL || `http://localhost:${CLIENT_PORT}`;

export const SERVER_PORT = process.env.SERVER_PORT || 3333;
export const SERVER_URL =
  process.env.SERVER_URL || `http://localhost:${SERVER_PORT}`;

export default module.exports = {
  CLIENT_PORT,
  CLIENT_URL,
  SERVER_PORT,
  SERVER_URL,
};
