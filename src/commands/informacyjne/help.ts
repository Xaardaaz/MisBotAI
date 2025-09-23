import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Wyświetla listę dostępnych komend.')
    .addStringOption((option) =>
      option.setName('komenda').setDescription('Nazwa komendy, której opis chcesz zobaczyć.')
    ),
  aliases: ['h', 'pomoc', 'lista'],
  category: 'Informacyjne',
  async execute(interaction: ChatInputCommandInteraction) {
    const commandName = interaction.options.getString('komenda');
    const { commands } = interaction.client;

    if (commandName) {
      const command = commands.get(commandName);
      if (!command) {
        return interaction.reply({ content: 'Nie znaleziono takiej komendy!', ephemeral: true });
      }

      const embed = new EmbedBuilder()
        .setTitle(`Pomoc: ${command.data.name}`)
        .addFields(
          { name: 'Nazwa', value: command.data.name, inline: true },
          { name: 'Aliasy', value: command.aliases?.join(', ') || 'Brak', inline: true },
          { name: 'Opis', value: command.data.description || 'Brak opisu.' },
          { name: 'Kategoria', value: command.category || 'Brak kategorii.' },
        );

      return interaction.reply({ embeds: [embed], ephemeral: true });
    } else {
      const categories = new Set<string>();
      commands.forEach((cmd: any) => categories.add(cmd.category));

      const embed = new EmbedBuilder()
        .setTitle('Lista komend')
        .setDescription(
          Array.from(categories)
            .map((category) => {
              const commandsInCategory = Array.from(commands.values())
                .filter((cmd: any) => cmd.category === category)
                .map((cmd: any) => `"`${cmd.data.name}"`: ${cmd.data.description}`)
                .join('\n');
              return `**${category}**\n${commandsInCategory}`;
            })
            .join('\n\n'),
        );

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};