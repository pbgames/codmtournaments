class RegistrationsController < Devise::RegistrationsController
  def create
    build_resource(sign_up_params)

    data = confirm_resource

    render(json: data)
  end

  private

  def confirm_resource
    response_data = { success: true }
    if resource.save
      save_resource
    else
      clean_up_passwords(resource)
      response_data = { success: false, errors: resource.errors }
    end
    response_data
  end

  def save_resource
    if resource.active_for_authentication?
      sign_up(resource_name, resource)
    else
      expire_session_data_after_sign_in!
    end
  end

  def sign_up(resource_name, resource)
    sign_in(resource_name, resource)
  end

  def sign_up_params
    params.require(:user).permit(:username, :instagram,
                                 :email, :password, :password_confirmation)
  end
end
