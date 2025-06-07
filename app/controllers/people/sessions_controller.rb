# frozen_string_literal: true

class People::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    render json: {
      message: "Logged in successfully",
      person: resource,
      token: current_token
    }, status: :ok
  end

  def respond_to_on_destroy
    head :no_content
  end

  def current_token
    request.env["warden-jwt_auth.token"]
  end
end
