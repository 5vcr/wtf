Rails.application.routes.draw do
  get 'users/dashboard'
  get 'users/create'

  get 'feedbacks/create'
  get 'feedbacks/new'

  get 'queries/create'
  get 'queries/show'
  get 'queries/new'

  root to: 'pages#home'
end
