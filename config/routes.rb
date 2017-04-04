Rails.application.routes.draw do
  get 'users/dashboard'

  get 'users/create'

  get 'feedbacks/create'

  get 'feedbacks/new'

  get 'queries/create'

  get 'queries/show'

  get 'queries/new'

  root to: 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
