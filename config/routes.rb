Rails.application.routes.draw do
  devise_for :accounts,
    controllers: { omniauth_callbacks: 'accounts/omniauth_callbacks' }

  get 'users/dashboard', as: :dashboard # dashboard_path
  post 'users/create'

  post 'feedbacks/create' => 'feedbacks#create'
  get 'feedbacks/new' => 'feedbacks#new'

  post 'queries/create' => 'queries#create'
  get 'queries/show', as: :query # :id of the graph

  get 'queries/new/country', to: 'queries#new_country'
  get 'queries/new/category', to: 'queries#new_category'
  get 'queries/new/compare', to: 'queries#new_compare'

  root to: 'pages#home'
end
