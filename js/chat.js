class ChatRoom{
    constructor(room,username){
        this.room = room;
        this.username = username;
        this.chat = db.collection('chat');
        this.unsub;
    }

    async addChat(message){
        const current = new Date();
        const chat = {
            message: message,
            username:this.username,
            room:this.room,
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

    updateName(username){
        this.username = username;
        localStorage.setItem("username",username);
    }

    updateRoom(room){
        this.room = room;
        if (this.unsub){
            this.unsub()
        }
        
        console.log('room updated')
    }
}

