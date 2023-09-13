Rails.application.routes.draw do
  root 'games#index'
  resources :games, only: [:index, :play]
  resources :words
  get 'games/play', to: 'games#play', as: 'play_game'
end
