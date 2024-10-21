let handler = async (m, { conn }) => {
  if (global.conn.user.jid === conn.user.jid) {
  } else {
    await conn.reply(m.chat, `Adiós Ai :(`, m, rcanal)
    conn.ws.close()
  }
}
handler.help = ['']
handler.tags = ['']
handler.command = ['', '', '']
handler.owner = true

export default handler
