'use server';

export async function sendToDiscord(name: string, message: string) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    // This will only log on the Vercel server console, not the user's browser
    console.error("DISCORD_WEBHOOK_URL is not defined");
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: "🚀 New Portfolio Message",
          color: 0x5865F2,
          fields: [
            { name: "From", value: name || "Anonymous", inline: true },
            { name: "Message", value: message }
          ],
          timestamp: new Date().toISOString(),
        }]
      }),
    });

    return response.ok;
  } catch (error) {
    console.error("Fetch error:", error);
    return false;
  }
}
