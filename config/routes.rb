Rails.application.routes.draw do
  ActiveAdmin.routes(self)
  devise_for :accounts,
    controllers: { omniauth_callbacks: 'accounts/omniauth_callbacks' }

  get 'users/dashboard', as: :dashboard # dashboard_path
  post 'users' => 'users#create'

  post 'feedbacks' => 'feedbacks#create'
  get 'feedbacks/new' => 'feedbacks#new'

  get 'queries/new/country', to: 'queries#new_country'
  get 'queries/new/category', to: 'queries#new_category'
  get 'queries/new/compare', to: 'queries#new_compare'

  post 'queries' => 'queries#create'
  get 'queries/build_graph', to: 'queries#build_graph'

  get 'queries/:id/country', to: 'queries#eurostats_show_country', as: :country # :id of the graph
  get 'queries/:id/category', to: 'queries#eurostats_show_category', as: :category # :id of the graph
  get 'queries/:id/compare', to: 'queries#eurostats_show_compare', as: :compare # :id of the graph

  root to: 'pages#home'
end
