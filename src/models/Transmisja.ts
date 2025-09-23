import { Schema, model } from 'mongoose';

interface ITransmisja {
  guildId: string;
  creatorName: string;
  platform: 'twitch' | 'youtube' | 'kick' | 'tiktok';
  channelId: string;
  message: string;
}

const TransmisjaSchema = new Schema<ITransmisja>({
  guildId: { type: String, required: true },
  creatorName: { type: String, required: true },
  platform: { type: String, enum: ['twitch', 'youtube', 'kick', 'tiktok'], required: true },
  channelId: { type: String, required: true },
  message: { type: String, required: true },
});

export const Transmisja = model<ITransmisja>('Transmisja', TransmisjaSchema);