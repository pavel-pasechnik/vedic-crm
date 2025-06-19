class ApplicationMailer < ActionMailer::Base
  default from: Rails.configuration.action_mailer.smtp_settings[:user_name] || 'default@example.com'
end
