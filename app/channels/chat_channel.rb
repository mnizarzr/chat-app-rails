class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "some_channel"
    generate_
    puts "Hello Cable"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
