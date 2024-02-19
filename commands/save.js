const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js')
const db = require("../mongoDB")
module.exports = {
  name: "save",
  description: "It sends and saves the played music to you via dm box.",
  permissions: "0x0000000000000800",
  options: [],
  run: async (client, interaction) => {
  

  try {

    const queue = client.player.getQueue(interaction.guild.id) 
    if (!queue || !queue.playing) return interaction.reply({ content: '⚠️ No Music Playing!', ephemeral: true }).catch(e => { })

    const Modal = new ModalBuilder()
    .setCustomId("playlistModal")
    .setTitle('Save Song')

    const PlayList = new TextInputBuilder()
    .setCustomId("playlist")
    .setLabel('Album Name Here')
    .setRequired(true)
    .setStyle(TextInputStyle.Short)

    const PlaylistRow = new ActionRowBuilder().addComponents(PlayList)
    Modal.addComponents(PlaylistRow)
    await interaction.showModal(Modal).catch(e => { })

  } catch (e) {
      console.error(e);
    }
  },
}