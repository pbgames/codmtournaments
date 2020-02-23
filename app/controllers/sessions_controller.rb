class SessionsController < Devise::SessionsController
  def create
    data = false
    if user&.valid_password?(params[:password])
      data = true
      sign_in(resource_name, resource)
    end
    render(json: data)
  end

  private

  def user
    @user ||= User.find_by(email: params[:email])
  end
end
