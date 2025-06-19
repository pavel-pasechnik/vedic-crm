# frozen_string_literal: true

class People::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
    generic_callback('google_oauth2')
  end

  def facebook
    generic_callback('facebook')
  end

  def failure
    redirect_to root_path, alert: 'Authentication failed'
  end

  private

  def generic_callback(provider)
    @person = Person.from_omniauth(request.env['omniauth.auth'])

    if @person.persisted?
      sign_in(@person)
      token = Warden::JWTAuth::UserEncoder.new.call(
        @person, :person, nil
      ).first
      render json: { person: @person, token: token }, status: :ok
    else
      session["devise.#{provider}_data"] = request.env['omniauth.auth'].except('extra')
      render json: { error: 'Ошибка аутентификации' }, status: :unprocessable_entity
    end
  end
end
