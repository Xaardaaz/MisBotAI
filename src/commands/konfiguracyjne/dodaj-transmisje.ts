import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { Transmisja } from '../../models/Transmisja';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dodaj-transmisje')
    .setDescription('Dodaje powiadomienie o transmisji dla wskazanego twórcy.')
    .addStringOption((option) =>
      option.setName('tworca').setDescription('Nazwa twórcy.').setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('platforma')
        .setDescription('Platforma (twitch/youtube/kick/tiktok).')
        .setRequired(true)
        .addChoices(
          { name: 'Twitch', value: 'twitch' },
          { name: 'YouTube', value: 'youtube' },
          { name: 'Kick', value: 'kick' },
          { name: 'TikTok', value: 'tiktok' },
        )
    )
    .addStringOption((option) =>
      option.setName('kanal').setDescription('ID kanału docelowego.').setRequired(true)
    )
    .addStringOption((option) =>
      option.setName('wiadomosc').setDescription('Treść powiadomienia.').setRequired(true)
    ),
  category: 'Konfiguracyjne',
  async execute(interaction: ChatInputCommandInteraction) {
    const creatorName = interaction.options.getString('tworca')!;
    const platform = interaction.options.getString('platforma')!;
    const channelId = interaction.options.getString('kanal')!;
    const message = interaction.options.getString('wiadomosc')!;

    await Transmisja.create({
      guildId: interaction.guildId!,
      creatorName,
      platform,
      channelId,
      message,
    });

    return interaction.reply({
      content: `Dodano powiadomienie dla **${creatorName}** na platformie **${platform}**!`,
      ephemeral: true,
    });
  },
};