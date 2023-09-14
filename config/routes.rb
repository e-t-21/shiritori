Rails.application.routes.draw do
  root 'games#index'
  resources :games, only: [:index, :play] do
    get 'get_unselected_images', on: :collection
  end
  resources :words
  get 'games/play', to: 'games#play', as: 'play_game'
  get '/check_image', to: 'words#check_image'
end