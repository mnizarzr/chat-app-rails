import consumer from "./consumer"

consumer.subscriptions.create({
    channel: "ChatChannel",
    user: 123
});
