class ApplicationMailer < ActionMailer::Base
  default from: (Rails.configuration.action_mailer.smtp_settings&.dig(:user_name) || 'default@example.com')
end
