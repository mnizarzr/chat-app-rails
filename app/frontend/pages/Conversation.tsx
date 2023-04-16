import { useLocation } from "react-router"
import consumer from "../channels/consumer";
import { useEffect, useState } from "react";
import CryptoJS from 'crypto-js'
import { Link } from "react-router-dom";
import { log } from "console";


function Conversation() {

    const params = useLocation();

    let state = {
        user: params.state?.user ?? "Dan",
        room: params.state?.room ?? "Ruang satu"
    }

    const [messages, setMessages] = useState<Array<Message>>([])
    const [inputMessage, setInputMessage] = useState<string>("")

    let channel = consumer.subscriptions.create({ channel: "ChatChannel", room: state.room }, {
        connected: () => {
            console.log(`Connected ${channel.identifier}`)
        },
        received: (data) => {
            if (Array.isArray(data)) {
                setMessages([...messages, ...data]);
            }
            else { setMessages([...messages, data]); }
            console.log("MESSAGE(s): ", messages);
            console.log(`FROM ${channel.identifier}`);

        },
        getPrevious: () => {
            channel.perform("previous")
        },
        send_message: (message: Message) => {
            channel.perform("send_message", message)
        },
        disconnected: () => {
            console.log("Connection to Room disconnected")
        }
    });

    useEffect(() => {
        channel.getPrevious();

        return () => {
            channel.unsubscribe()
            console.log("Should unmount");
        }
    }, []);

    const handleOnMessageSend = (event: any) => {
        event.preventDefault();
        const message: Message = {
            body: inputMessage,
            user: state.user,
            room: state.room,
        }
        setInputMessage("");

        channel.send_message(message)
    }

    const getAvatar = (user: string) => {
        let email = `${user.trim()}@gmail.com`.toLowerCase()
        let hash = CryptoJS.MD5(email).toString();
        return `https://www.gravatar.com/avatar/${hash}?d=wavatar`
    }

    return <>
        <div className="none:container w-screen h-screen flex flex-col">
            <div className="w-full">
                <div className="bg-primary p-4 px-8">
                    <div className="flex flex-row justify-center items-center">
                        <a className="font-medium text-neutral-content" >
                            {state.room}
                        </a>
                        <Link to={"/"} replace className="grow justify-center text-xl font-bold uppercase text-neutral-content text-center" >
                            Conversation
                        </Link>
                        <a className="font-medium text-neutral-content" >
                            {state.user}
                        </a>
                    </div >
                </div >
            </div>
            <div id="messages" className="flex-grow sm:px-8 md:px-8 lg:px-32 py-8">
                <div id="messages_list">
                    <ul>
                        {messages.map((message, index) => (
                            <li key={index}>
                                <div className={"chat " + (message.user == state.user ? 'chat-end' : 'chat-start')}>
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img src={getAvatar(message.user)} />
                                        </div>
                                    </div>
                                    <div className="chat-header">
                                        {message.user}
                                    </div>
                                    <div className="chat-bubble">{message.body}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="w-full bg-primary py-8 px-32">
                <form onSubmit={handleOnMessageSend} className="flex flex-row justify-center items-center">
                    <input name="newMsg" className="input flex-grow" placeholder="Type your message..." autoComplete="off" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
                    <button type="submit" className="btn btn-neutral ml-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    </>

}

export default Conversation;
