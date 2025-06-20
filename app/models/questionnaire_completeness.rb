class QuestionnaireCompleteness < ApplicationRecord
   attribute :data, :json

  belongs_to :person
  belongs_to :questionnaire

  has_paper_trail
end
