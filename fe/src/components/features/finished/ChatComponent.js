// local imports
import { useDeleteChat } from '../../../hooks/api/chatAPI'
import ChatMessageComponent from './ChatMessageComponent'
import { useAnimateChatMessage } from '../../../hooks/animations/animations'
import AddToChatComponent from './AddToChatComponent'

const ChatComponent = ({ userData, nightOut, refreshNightOut, token }) => {
    // get the UseDeleteChatHook
    const { deleteChat } = useDeleteChat(refreshNightOut, token, nightOut.uuid)

    useAnimateChatMessage(nightOut, '#chat-message')

    return (
        <div className="container">
            <p className="mb-0 heading has-text-centered is-size-4 is-size-5-touch mt-3 label">
                Chat:
            </p>
            {nightOut.postsOnNightout.length === 0 && (
                <p className="mb-0 has-text-centered is-size-6 is-size-7-touch mt-3">
                    There are no messages on this chat yet. Go and write something 🚀.
                </p>
            )}
            {nightOut.postsOnNightout.map((post, index) => (
                <ChatMessageComponent
                    key={index}
                    index={index}
                    message={post}
                    userData={userData}
                    deleteChat={deleteChat}
                />
            ))}
            <AddToChatComponent
                userData={userData}
                token={token}
                refreshNightOut={refreshNightOut}
                uuid={nightOut.uuid}
            />
        </div>
    )
}

export default ChatComponent
