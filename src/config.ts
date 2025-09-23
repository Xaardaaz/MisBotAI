import dotenv from 'dotenv';
dotenv.config();

export const config = {
  token: process.env.TOKEN as string,
  clientId: process.env.CLIENT_ID as string,
  guildId: process.env.GUILD_ID as string,
  mongoURI: process.env.MONGO_URI as string,
};