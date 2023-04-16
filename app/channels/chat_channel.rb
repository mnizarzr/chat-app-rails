class ChatChannel < ApplicationCable::Channel
  attr_accessor :room

  def subscribed
    @room = params[:room]
    stream_from "room:#{@room}"
    stream_for current_user # I want to load all previous message but it doesn't work
  end

  def unsubscribed
    stop_stream_for current_user
  end

  def previous
    all_room_messages = Message.all.where(room: @room)
    puts "SOCKET ID: #{current_user}"
    ChatChannel.broadcast_to(current_user, all_room_messages)
  end

  def send_message(data)
    puts "Connection", @connection.current_user
    message = Message.create(body: data['body'], room: data['room'], user: data['user'])
    ActionCable.server.broadcast("room:#{@room}", message)
  end
end
