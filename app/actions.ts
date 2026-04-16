'use server';

export async function sendToDiscord(name: string, message: string) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error("Webhook URL not configured");
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
            { name: "From", value: name, inline: true },
            { name: "Message", value: message }
          ],
          timestamp: new Date().toISOString(),
        }]
      }),
    });

    return response.ok;
  } catch (error) {
    console.error("Server Action Error:", error);
    return false;
  }
}
