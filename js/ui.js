class ChatUI{
    constructor(list){
        this.list =  list
    }
    render(data){
        const when = dateFns.distanceInWordsToNow(
            data.create_at.toDate(),{'addSuffix':true }
        );
        const html =`
            <li>
                <div class="message-item" style="border:2px solid #${data.color}">
                    <span class="username" style="color:#${data.color}">${data.username}</span>
                    <span class="message">${data.message}</span>
                    <div class="time">${when}</div>
                </div>
            </li>
        `
        this.list.innerHTML += html;
    }

    clear(){
        this.list.innerHTML='';
    }
}