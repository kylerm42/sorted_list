Rails.application.routes.draw do
  root to: 'list_items#index'

  resources :list_items, only: :index do
    post :order, on: :collection
  end
end
