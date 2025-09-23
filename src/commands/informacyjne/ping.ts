import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Sprawdza opóźnienie bota!'),
  category: 'Informacyjne',
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply(`Pong! ${interaction.client.ws.ping}ms`);
  },
};