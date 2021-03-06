Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'registrations',
    sessions: 'sessions'
  }
  root to: 'onboarding#index'
  get '/dashboard', to: 'dashboard#index'
end
