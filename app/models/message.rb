# frozen_string_literal: true

class Message < ApplicationRecord
  def self.all_users
    Message.all.distinct.pluck(:user)
  end

  def self.all_rooms
    Message.all.distinct.pluck(:room)
  end

  def self.user_exist(user)
    return false unless all_users.include?(user)

    true
  end

  def self.room_exist(room)
    return false unless all_rooms.include?(room)

    true
  end

end
