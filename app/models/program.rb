class Program < ApplicationRecord
  has_many :study_applications, dependent: :destroy
  has_many :programs_questionnaires, dependent: :destroy

  belongs_to :manager, class_name: 'Person'
  has_many :questionnaires, through: :programs_questionnaires

  validates :title_uk, :title_ru, :description_uk, :description_ru, presence: true

  has_paper_trail
end
