module.exports = {
  name: 'interactionCreate',
  async execute(interaction: any, client: any) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'Wystąpił błąd podczas wykonywania tej komendy!',
        ephemeral: true,
      });
    }
  },
};