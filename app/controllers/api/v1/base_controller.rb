module Api
  module V1
    class BaseController < ApplicationController
      protect_from_forgery with: :null_session

      respond_to :json

      skip_before_action :set_locale

      alias current_person current_api_v1_person
    end
  end
end
