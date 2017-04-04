Rails.application.routes.draw do
  get 'users/dashboard', as: :dashboard # dashboard_path
  post 'users/create'

  post 'feedbacks/create'
  get 'feedbacks/new'

  post 'queries/create'
  get 'queries/:id', as: :query

  get 'queries/new/country', to: 'queries#new_country'
  get 'queries/new/category', to: 'queries#new_category'
  get 'queries/new/compare', to: 'queries#new_compare'

  root to: 'pages#home'
end
