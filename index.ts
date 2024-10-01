import dotenv from 'dotenv';
import { Bot, GrammyError, HttpError } from 'grammy';

dotenv.config();

const bot = new Bot(process.env.BOT_API_TOKEN!);

bot.command('start', async(ctx) => {
    await ctx.reply('Hi! I am a BOT 💫');
});

bot.on('message', async(ctx) => {
    await ctx.reply('Wait...');
});

bot.catch((error) => {
    const ctx = error.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}`);
    const e = error.error;

    if( e instanceof GrammyError){
        console.error(`Error in request: ${e.description}`);
    } else if( e instanceof HttpError){
        console.error(`Could not contact Telegram: ${e}`);
    } else {
        console.error(`Unknown error: ${e}`);
    }
});

bot.start();