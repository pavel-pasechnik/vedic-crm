class ApplicationController < ActionController::Base
  include Pundit::Authorization

  protect_from_forgery with: :exception

  before_action :set_paper_trail_whodunnit, :set_sentry_context
  before_action :set_locale, :authenticate_person!
  skip_before_action :verify_authenticity_token, if: -> { request.format.json? }

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  def set_locale
    I18n.locale = current_person.present? ? current_person.locale : session[:locale] || :uk
  end

  def user_not_authorized
    flash[:danger] = t('not_authorized')

    redirect_to((request.referer || root_path), status: :see_other)
  end

  def pundit_user
    current_person
  end

  def user_for_paper_trail
    current_person.present? ? current_person.id : :anonymous
  end

  def respond_with_interaction(klass, resource = nil)
    render json: klass.new(user: current_person, params: params, resource: resource)
  end

  def set_sentry_context
  return unless Sentry.initialized?

  Sentry.set_user(id: user_for_paper_trail)
  Sentry.set_context('params', params.to_unsafe_h)
  Sentry.set_tags(url: request.url)
  end
end
