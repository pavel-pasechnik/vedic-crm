require 'factory_bot_rails'
require 'ffaker'

# Generate a unique Ukrainian mobile phone number in the format "+380 XX XXX XXXX"
def unique_phone
  valid_codes = %w[93 50 66 67 68 96 97 98 99]
  loop do
    code    = valid_codes.sample
    prefix  = rand(100..999).to_s.rjust(3, '0')
    suffix  = rand(1000..9999).to_s.rjust(4, '0')
    number  = "+380 #{code} #{prefix} #{suffix}"
    break number unless Telephone.exists?(phone: number)
  end
end

classrooms = 3.times.map do |i|
  Classroom.create!(
    title: "Аудиторія #{i + 1}",
    location: "Поверх #{i + 1}",
    description: "Навчальна аудиторія",
    roominess: 20 + i * 5
  )
end



admin_role = Role.find_or_create_by!(name: 'admin') do |role|
  role.activities = ['all_activities']
end
admin_teacher = Person.find_by(email: 'admin@example.com')
if admin_teacher.nil? || !admin_teacher.persisted?
  phone = unique_phone
  admin_teacher = Person.create!(
    gender: true,
    middle_name: 'Adminovich',
    name: 'Admin',
    password: 'password',
    password_confirmation: 'password',
    privacy_agreement: 'yes',
    birthday: 30.years.ago.to_date,
    email: 'admin@example.com',
    surname: 'Adminov',
    telephones: [Telephone.new(phone: phone)],
    roles: [admin_role]
  )
end

raise "Admin teacher not created" unless admin_teacher && admin_teacher.persisted?
teacher_profile = admin_teacher.teacher_profile || admin_teacher.create_teacher_profile!(description: 'Основний викладач')
raise "Admin teacher profile not created" unless teacher_profile && teacher_profile.persisted?

2.times do
  phone = unique_phone
  praepostor = Person.create!(
    gender: true,
    middle_name: 'Praepostorovich',
    name: 'Praepostor',
    password: 'password',
    password_confirmation: 'password',
    privacy_agreement: 'yes',
    birthday: 26.years.ago.to_date,
    email: FFaker::Internet.email,
    surname: 'Leadov',
    telephones: [Telephone.new(phone: phone)]
  )
  phone = unique_phone
  curator = Person.create!(
    gender: true,
    middle_name: 'Curatorovich',
    name: 'Curator',
    password: 'password',
    password_confirmation: 'password',
    privacy_agreement: 'yes',
    birthday: 28.years.ago.to_date,
    email: FFaker::Internet.email,
    surname: 'Guideov',
    telephones: [Telephone.new(phone: phone)]
  )
  # Generate a unique course title using FFaker
  unique_title = FFaker::Book.unique.title

  course = Course.find_or_create_by!(title: unique_title) do |c|
    c.description = FFaker::Lorem.sentence
    c.teacher_profiles = [teacher_profile]
  end

  class_schedule = ClassSchedule.first || ClassSchedule.create!(
    start_time: Time.zone.now.change(hour: 9, min: 0),
    finish_time: Time.zone.now.change(hour: 10, min: 30),
    classroom: classrooms.sample,
    course: course,
    teacher_profile: teacher_profile
  )

  AcademicGroupSchedule.create!(
    academic_group: AcademicGroup.find_or_create_by!(title: FFaker::Book.unique.title) do |g|
      g.establ_date = Date.today
      g.administrator = admin_teacher
      g.praepostor    = praepostor
      g.curator       = curator
      g.group_description = 'Опис групи'
    end,
    class_schedule: class_schedule
  )
end

AcademicGroup.all.each do |group|
  4.times do
    phone = unique_phone
    student = Person.create!(
      gender: true,
      middle_name: 'Studovich',
      name: 'Student',
      password: 'password',
      password_confirmation: 'password',
      privacy_agreement: 'yes',
      birthday: 20.years.ago.to_date,
      email: FFaker::Internet.email,
      surname: 'Studentov',
      telephones: [Telephone.new(phone: phone)]
    )

      student_profile = StudentProfile.create!(person: student)
      GroupParticipation.create!(academic_group: group, student_profile: student_profile)

  end
end



Rake::Task['academic:create_programs'].invoke
Rake::Task['academic:create_questionnaires'].invoke

Program.find_each do |program|
  2.times do
    phone = unique_phone
    person = Person.create(
      gender: true,
      middle_name: 'Appovich',
      name: 'Applicant',
      password: 'password',
      password_confirmation: 'password',
      privacy_agreement: 'yes',
      birthday: 22.years.ago.to_date,
      email: FFaker::Internet.email,
      surname: 'Zayavkin',
      telephones: [Telephone.new(phone: phone)]
    )

      StudyApplication.create!(program: program, person: person)

  end
end

AcademicGroup.all.each { |group| group.courses << Course.all }

Course.all.each do |course|
  Examination.create!(
    course: course,
    title: 'Підсумковий іспит',
    max_result: 100,
    min_result: 60,
    description: 'Фінальне тестування',
    passing_score: 70
  )
end

puts "✅ Завантаження даних завершено: Суперадмін(#{admin_teacher.email}), Інституція, Курс, Розклад"

# --- Additional group participants and course ---

# Teacher
phone = unique_phone
teacher = Person.create!(
  gender: true,
  middle_name: 'Teachovich',
  name: 'Teacher',
  surname: 'Teachov',
  email: FFaker::Internet.email,
  password: 'password',
  password_confirmation: 'password',
  privacy_agreement: 'yes',
  birthday: 35.years.ago.to_date,
  telephones: [Telephone.new(phone: phone)]
)
teacher_profile = teacher.create_teacher_profile!(description: 'Викладач додатковий')
course = Course.first
course.teacher_profiles << teacher_profile unless course.teacher_profiles.include?(teacher_profile)

# Group curator
phone = unique_phone
curator = Person.create!(
  gender: true,
  middle_name: 'Curatorovich',
  name: 'Curator',
  surname: 'Guideov',
  email: FFaker::Internet.email,
  password: 'password',
  password_confirmation: 'password',
  privacy_agreement: 'yes',
  birthday: 30.years.ago.to_date,
  telephones: [Telephone.new(phone: phone)]
)
# Group leader (praepostor)
phone = unique_phone
starosta = Person.create!(
  gender: true,
  middle_name: 'Starostovich',
  name: 'Starosta',
  surname: 'Leadov',
  email: FFaker::Internet.email,
  password: 'password',
  password_confirmation: 'password',
  privacy_agreement: 'yes',
  birthday: 22.years.ago.to_date,
  telephones: [Telephone.new(phone: phone)]
)
group = AcademicGroup.find_or_create_by!(title: FFaker::Book.unique.title) do |g|
  g.establ_date = Date.today
  g.administrator = admin_teacher
  g.curator       = curator
  g.praepostor    = starosta
  g.group_description = 'Перша навчальна група'
end

# Group students
5.times do
  phone = unique_phone
  student = Person.create(
    gender: true,
    middle_name: 'Studovich',
    name: 'Student',
    surname: 'Studov',
    email: FFaker::Internet.email,
    password: 'password',
    password_confirmation: 'password',
    privacy_agreement: 'yes',
    birthday: 20.years.ago.to_date,
    telephones: [Telephone.new(phone: phone)]
  )
  
    student_profile = StudentProfile.create!(person: student)
    GroupParticipation.create!(academic_group: group, student_profile: student_profile)
    
end

# A pair of active applications (StudyApplication)
Program.limit(2).each do |program|
  1.times do
    phone = unique_phone
    applicant = Person.create!(
      gender: true,
      middle_name: 'Appovich',
      name: 'Applicant',
      surname: 'Zayavkin',
      email: FFaker::Internet.email,
      password: 'password',
      password_confirmation: 'password',
      privacy_agreement: 'yes',
      birthday: 25.years.ago.to_date,
      telephones: [Telephone.new(phone: phone)]
    )
    StudyApplication.create!(program: program, person: applicant)
  end
end


puts "✅ Added teacher, curator, starosta, students and study applications"
puts "✅ Додано викладача, куратора, старосту, студентів та заявки на вступ"

# --- Add subjects and additional exams for all courses ---
require 'securerandom'

Course.find_each do |course|
  phone = unique_phone
  unique_teacher = Person.create!(
    gender: true,
    middle_name: 'Teachovich',
    name: 'Teacher',
    surname: FFaker::Name.last_name,
    email: FFaker::Internet.email,
    password: 'password',
    password_confirmation: 'password',
    privacy_agreement: 'yes',
    birthday: 40.years.ago.to_date,
    telephones: [Telephone.new(phone: phone)]
  )
  unique_teacher_profile = unique_teacher.create_teacher_profile!(description: 'Викладач предмету')
  course.teacher_profiles << unique_teacher_profile unless course.teacher_profiles.include?(unique_teacher_profile)

  # Subjects (ClassSchedule with different topics)
  %w[Філософія Література Історія].each_with_index do |subj, i|
    start_time = Time.zone.now.change(hour: 8 + i, min: 0)
    finish_time = start_time + 1.hour
    classroom = classrooms[i % classrooms.size]

    next if ClassSchedule.exists?(course: course, subject: subj)

    if unique_teacher_profile.respond_to?(:available_at?) && unique_teacher_profile.available_at?(start_time, finish_time) &&
       classroom.respond_to?(:available_at?) && classroom.available_at?(start_time, finish_time)
      ClassSchedule.create!(
        course: course,
        teacher_profile: unique_teacher_profile,
        classroom: classroom,
        start_time: start_time,
        finish_time: finish_time,
        subject: subj
      )
    else
      puts "⚠️ Пропущено створення ClassSchedule для предмету #{subj} через зайнятість викладача або аудиторії"
    end
  end

  # Examinations
  [
    { title: 'Проміжний екзамен', description: 'Проміжкове тестування', min: 50, max: 100, pass: 60 },
    { title: 'Підсумковий екзамен', description: 'Підсумковий контроль знань', min: 60, max: 100, pass: 70 }
  ].each do |exam_attrs|
    Examination.create!(
      course: course,
      title: exam_attrs[:title],
      description: exam_attrs[:description],
      min_result: exam_attrs[:min],
      max_result: exam_attrs[:max],
      passing_score: exam_attrs[:pass]
    )
  end
end

# --- Form a completed course and issue certificates ---
finished_course = Course.find_or_create_by!(title: 'Завершений курс') do |c|
  c.description = 'Усі заняття завершені, курс завершено'
end

# --- Add schedule (subjects) and exams for the completed course ---
%w[Методология Практика].each_with_index do |subj, idx|
  # Create a unique teacher and profile for each subject
  phone = unique_phone
  teacher = Person.create!(
    gender: true,
    middle_name: 'Teachovich',
    name: 'Teacher',
    surname: FFaker::Name.last_name,
    email: FFaker::Internet.unique.email,
    password: 'password',
    password_confirmation: 'password',
    privacy_agreement: 'yes',
    birthday: 40.years.ago.to_date,
    telephones: [Telephone.new(phone: phone)]
  )
  prof = teacher.create_teacher_profile!(description: "Викладач завершеного курсу – #{subj}")

  # Assign this profile to the completed course
  finished_course.teacher_profiles << prof

  # Schedule on different days to avoid conflicts
  start_time = Time.zone.now.beginning_of_day + (idx + 1).days + 10.hours
  finish_time = start_time + 2.hours

  cs = ClassSchedule.new(
    course: finished_course,
    teacher_profile: prof,
    classroom: classrooms[idx % classrooms.size],
    start_time: start_time,
    finish_time: finish_time,
    subject: subj
  )

  # Force availability bypass by skipping all validations when saving the schedule
  cs.save!(validate: false)
end

finished_exams = []
[
  { title: 'Контрольна робота', description: 'Проміжкова перевірка', min: 40, max: 100, pass: 50 },
  { title: 'Підсумковий екзамен', description: 'Підсумковий іспит', min: 60, max: 100, pass: 70 }
].each do |exam_attrs|
  finished_exams << Examination.create!(
    course: finished_course,
    title: exam_attrs[:title],
    description: exam_attrs[:description],
    min_result: exam_attrs[:min],
    max_result: exam_attrs[:max],
    passing_score: exam_attrs[:pass]
  )
end

# Create a group for the completed course and students
finished_group = AcademicGroup.create!(
  title: 'Группа завершения',
  establ_date: Date.today - 3.months,
  administrator: admin_teacher,
  curator: curator,
  praepostor: starosta,
  group_description: 'Студенти успішно завершили курс'
)

# Students of the completed course
3.times do
  phone = unique_phone
  stud = Person.create!(
    gender: true,
    middle_name: 'Gradovich',
    name: 'Graduate',
    surname: 'Finin',
    email: FFaker::Internet.unique.email,
    password: 'password',
    password_confirmation: 'password',
    privacy_agreement: 'yes',
    birthday: 21.years.ago.to_date,
    telephones: [Telephone.new(phone: phone)]
  )
  sp = StudentProfile.create!(person: stud)
  GroupParticipation.create!(academic_group: finished_group, student_profile: sp)
end


# Create certificate template and issue certificates with average score
# Seed CertificateTemplate
institution = Institution.find_or_create_by!(name: 'Київська духовна академія свідомості Кришни в Україні')
certificate_template = CertificateTemplate.find_or_create_by!(title: 'Сертифікат завершення курсу') do |ct|
  ct.institution              = institution
  ct.program_type            = :other
  ct.is_final_score_required = true
  seed_file = Rails.root.join('db', 'seeds', 'templates', 'certificate.pdf')
  if File.exist?(seed_file)
    ct.file = File.open(seed_file)
  else
    puts "⚠️ Certificate template file not found at #{seed_file}; skipping file attachment"
  end
end

finished_group.student_profiles.each do |sp|
  # Adding exam results
  results = finished_exams.map do |exam|
    score = rand(exam.passing_score..exam.max_result)
    ExaminationResult.create!(examination: exam, student_profile: sp, score: score)
    score
  end

  avg_score = results.sum / results.size

  Certificate.create!(
    academic_group: finished_group,
    certificate_template: certificate_template,
    student_profile: sp,
    issued_date: Date.today,
    serial_id: SecureRandom.hex(8),
    final_score: avg_score
  )
end

puts "✅ Added subjects, exams for all courses and created finished course with certificates"
puts "✅ Додано предмети, екзамени для всіх курсів та створено завершений курс із сертифікатами"
