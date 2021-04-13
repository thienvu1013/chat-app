class ChatUI{
    constructor(list){
        this.list =  list
    }
    render(data){
        const when = dateFns.distanceInWordsToNow(
            data.create_at.toDate(),{'addSuffix':true }
        );
        const html =`
            <li class="message-item">
                <span class="username">${data.username}</span>
                <span class="message">${data.message}</span>
                <div class="time">${when}</div>
            </li>
        `
        this.list.innerHTML += html;
    }

    clear(){
        this.list.innerHTML='';
    }
}