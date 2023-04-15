require 'test_helper'

class MessageTest < ActiveSupport::TestCase
  test 'all_users should return Array' do
    assert_equal Array, Message.all_users
  end

  test 'all_rooms should return Array' do
    assert_equal Array, Message.all_rooms
  end
end
