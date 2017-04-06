Rails.application.routes.draw do
  devise_for :accounts,
    controllers: { omniauth_callbacks: 'accounts/omniauth_callbacks' }

  get 'users/dashboard', as: :dashboard # dashboard_path
  post 'users/create'

  get 'queries/build_graph', to: 'queries#build_graph'

  post 'feedbacks/create' => 'feedbacks#create'
  get 'feedbacks/new' => 'feedbacks#new'

  post 'queries/create' => 'queries#create'
  get 'queries/show', as: :query # :id of the graph

  get 'queries/new/selection', to: 'queries#new_selection'

  root to: 'pages#home'
end
