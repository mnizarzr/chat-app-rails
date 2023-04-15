Rails.application.routes.draw do
  namespace :api do
    get '/choice', to: 'chat#get_users_rooms', export: true
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'chat#index'
  get 'chat/index'
  get '/*path' => 'chat#home'
end
