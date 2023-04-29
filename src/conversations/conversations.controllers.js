const uuid = require('uuid')

const Conversations = require('../models/conversations.models')
const Users = require('../models/users.models')
const Participants = require('../models/participants.models')

const createConversation = async (conversationObj) => {
    const userGuest = await Users.findOne({
        where: {
            id: conversationObj.guestId
        }
    })

    if(!userGuest) return false

    const newConversations = await Conversations.create({
        id: uuid.v4(),
        name: conversationObj.name,
        profileImage: conversationObj.profileImage,
        isGroup: conversationObj.isGroup
    })

    await Participants.create({
        id: uuid.v4(),
        userId: conversationObj.ownerId,
        conversationId: newConversations.id,
        isAdmin: true
    })

    await Participants.create({
        id: uuid.v4(),
        userId: conversationObj.guestId,
        conversationId: newConversations.id,
        isAdmin: false
    })
    return newConversations
}

createConversation({
    name: "Conversacion entre Sahid y Edgar",
    ownerId: "744ab422-2402-4100-95a5-0fc4b96a6c0b",
    guestId: "6d6c9bf0-970d-45ff-a2ba-7d060adfeab0"
})

module.exports = createConversation
