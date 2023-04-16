# frozen_string_literal: true

require 'test_helper'

module Api
  class ChatControllerTest < ActionDispatch::IntegrationTest
    test 'json should contain rooms and users' do
      get api_choice_path
      assert_equal 'application/json', @response.media_type
      @response.parsed_body.assert_valid_keys('users', 'rooms')
    end
    test 'rooms and users should be an array' do
      get api_choice_path
      assert_equal 'application/json', @response.media_type
      assert_equal Array, @response.parsed_body["users"].class
      assert_equal Array, @response.parsed_body["rooms"].class
    end
  end
end
