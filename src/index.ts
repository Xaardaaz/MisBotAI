import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { config } from './config';
import { readdirSync } from 'fs';
import { join } from 'path';
import { connectDB } from './utils/database';

// Inicjalizacja klienta
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Kolekcja komend
client.commands = new Collection();

// Ładowanie komend
const commandsPath = join(__dirname, 'commands');
const commandFiles = readdirSync(commandsPath).filter((file) => file.endsWith('.ts'));

for (const file of commandFiles) {
  const filePath = join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

// Ładowanie zdarzeń
const eventsPath = join(__dirname, 'events');
const eventFiles = readdirSync(eventsPath).filter((file) => file.endsWith('.ts'));

for (const file of eventFiles) {
  const filePath = join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args: any[]) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args: any[]) => event.execute(...args, client));
  }
}

// Logowanie
client.on('debug', (info) => {
  console.log(`[DEBUG] ${info}`);
});

client.on('warn', (info) => {
  console.log(`[WARN] ${info}`);
});

// Połączenie z bazą danych
connectDB();

// Uruchomienie bota
client.login(config.token);