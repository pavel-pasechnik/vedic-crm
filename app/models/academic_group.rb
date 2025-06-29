class AcademicGroup < ApplicationRecord
  include ConditionQueryable
  include Ilikable

  has_many :group_participations, dependent: :destroy
  has_many :student_profiles, through: :group_participations

  has_many :academic_group_schedules, dependent: :destroy
  has_many :class_schedules, through: :academic_group_schedules
  has_many :certificates, dependent: :nullify

  belongs_to :administrator, class_name: 'Person', inverse_of: 'administrated_groups'
  belongs_to :praepostor, class_name: 'Person', inverse_of: 'praeposted_groups'
  belongs_to :curator, class_name: 'Person', inverse_of: 'curated_groups'

  has_and_belongs_to_many :courses

  has_many :examinations, through: :courses

  before_save { |p| p.title = title.mb_chars.upcase.to_s.strip if title.present? }

  validates :title, presence: true, uniqueness: true

  has_paper_trail

  scope :active, -> { where(graduated_at: nil).order(:title) }
  scope :active_by_establ_date, -> { where(graduated_at: nil).order(:establ_date) }
  scope :inactive_by_establ_date, -> { where.not(graduated_at: nil).order(:establ_date) }
  scope :by_active_title, -> { order(graduated_at: :desc, title: :asc) }

  def active_students
    leave_date = if active?
      {
        query: 'group_participations.leave_date IS ?',
        value: nil
      }
    else
      {
        query: 'group_participations.leave_date >= ? OR group_participations.leave_date IS NULL',
        value: graduated_at
      }
    end

    Person.joins(student_profile: [ group_participations: [ :academic_group ] ])
      .where(academic_groups: { id: id })
      .where(leave_date[:query], leave_date[:value])
      .order(:complex_name)
      .distinct
  end

  def active_for_person?(person)
    person.student_profile && last_participation_by_person(person).present?
  end

  def last_participation_by_person(person)
    group_participations.find_by(student_profile: person.student_profile, leave_date: nil)
  end

  def active?
    !graduated_at
  end

  def graduate!
    update!(graduated_at: Time.zone.now)
  end
end
