class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_#{params[:room]}"
    puts params
    puts "Hello Cable"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
