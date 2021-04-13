class ChatRoom{
    constructor(room,username, color){
        this.room = room;
        this.username = username;
        this.color = color
        this.chat = db.collection('chat');
        this.unsub;
    }

    async addChat(message){
        const current = new Date();
        const chat = {
            message: message,
            username:this.username,
            room:this.room,
            color:this.color,
            create_at: firebase.firestore.Timestamp.fromDate(current),
        }
        //saving to firebase
        const resp = await this.chat.add(chat);
        return resp;
    }

    getChats(callback){
        this.unsub = this.chat
            .where('room','==', this.room)
            .orderBy('create_at')
            .onSnapshot(snapshot=>{
            snapshot.docChanges().forEach((change)=>{
                if(change.type === "added"){
                    callback(change.doc.data());
                }
            })
        })
    }

    updateName(username,color){
        this.username = username;
        this.color = color
        localStorage.setItem("username",username);
        localStorage.setItem("color", color)
    }

    updateRoom(room){
        this.room = room;
        if (this.unsub){
            this.unsub()
        }
        
        console.log('room updated')
    }
}

