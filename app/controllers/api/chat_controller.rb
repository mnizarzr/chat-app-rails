class Api::ChatController < ApplicationController
  def get_users_rooms
    users = Message.all_users
    rooms = Message.all_rooms
    render json: { users: users, rooms: rooms }
  end
end
