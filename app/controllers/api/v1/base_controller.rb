module Api
  module V1
    class BaseController < ApplicationController
      protect_from_forgery with: :null_session

      respond_to :json

      skip_before_action :set_locale
    end
  end
end
