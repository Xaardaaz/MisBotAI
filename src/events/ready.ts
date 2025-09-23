module.exports = {
  name: 'ready',
  once: true,
  execute(client: any) {
    console.log(`Zalogowano jako ${client.user.tag}`);
  },
};