// dom query
const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newNameForm = document.querySelector(".new-username");
const usernameAsk = document.querySelector(".ask-username");
const rooms = document.querySelector(".chat-rooms");


// add new chat
newChatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(()=> {
            newChatForm.reset()
            const lastMessage = chatList.lastElementChild;
            console.log(chatList.lastElementChild)
            lastMessage.scrollIntoView();})
        .catch(err=> console.log(err));
    
})

// update username
newNameForm.addEventListener('submit',e=>{
    e.preventDefault();
    // get name
    const newName = newNameForm.name.value.trim();
    // update name
    chatroom.updateName(newName);
    // reset form
    newNameForm.reset();
    usernameAsk.classList.add("hidden");
})

// update chat rooms
rooms.addEventListener('click',(e)=>{
    if (e.target.nodeName === "BUTTON"){
        // clear current chat
        chatUI.clear();
        const room = e.target.id
        chatroom.updateRoom(room);
        chatroom.getChats(data=>chatUI.render(data));
    }
})


// class instances
const chatroom = new ChatRoom("general","anon");
const chatUI = new ChatUI(chatList);

const username = localStorage.username? localStorage.username: "anon";
if (username!=="anon"){
    usernameAsk.classList.add("hidden");
    chatroom.updateName(username);
}


//get chats and render
chatroom.getChats(data=>chatUI.render(data));