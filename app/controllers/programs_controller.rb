class ProgramsController < HtmlRespondableController
  include Crudable

  after_action :verify_policy_scoped, only: %i[index edit update destroy]

  def index
    @programs = policy_scope(Program).order(visible: :desc, position: :asc).includes(:manager)

    authorize Program

    respond_with(@programs)
  end

  def new
    @program = Program.new

    authorize @program

    respond_with(@program)
  end

  def edit
    respond_with(@program)
  end

  def create
    @program = Program.new(program_params)

    authorize @program
    @program.save
    reset_questionnaires_count

    respond_with(@program, location: programs_path)
  end

  def update
    @program.update(program_params)
    reset_questionnaires_count

    respond_with(@program, location: programs_path)
  end

  def destroy
    if @program.study_applications.any?
      redirect_back(
        fallback_location: programs_path,
        flash: {
          danger: t(
            '.process_study_applications_first',
            study_applications_count: @program.study_applications_count
          )
        }
      )
    else
      @program.destroy

      respond_with(@program)
    end
  end

  private

  def set_resource
    @program = policy_scope(Program).find(params[:id])

    authorize @program
  end

  def program_params
    permitted = params
                  .expect(
                    program: [ :title_uk,
                    :title_ru,
                    :description_uk,
                    :description_ru,
                    :visible,
                    :position,
                    :manager_id,
                    questionnaire_ids: [] ]
                  )

    permitted[:title_uk].strip!
    permitted[:title_ru].strip!
    permitted[:description_uk].strip!
    permitted[:description_ru].strip!

    permitted
  end

  def reset_questionnaires_count
    Program.reset_counters(@program.id, :questionnaires_count) if @program.persisted?
  end
end
