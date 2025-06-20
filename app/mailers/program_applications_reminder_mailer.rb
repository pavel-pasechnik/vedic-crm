class ProgramApplicationsReminderMailer < ApplicationMailer
  helper(ApplicationHelper)

  def manager_remind(manager_id:)
    @manager = Person.find(manager_id)
    @programs = Program
                  .joins(:study_applications)
                  .distinct
                  .where(manager_id: manager_id)
                  .includes(study_applications: [ :person ])

    I18n.with_locale(@manager.locale) do
      mail(to: @manager.email)
    end
  end
end
