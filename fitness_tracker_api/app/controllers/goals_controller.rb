class GoalsController < ApplicationController

  #CURD operations for GOALS here 
  # Fetch all goals
  def index
    goals = Goal.all
    render json: goals
  end

  #Create a new goal
  def create
    goal = Goal.new(goal_params)
    if goal.save
      render json: goal, status: :created
    else
      render json: goal.errors, status: :unprocessable_entity
    end
  end

  #Update a goal
  def update
    goal = Goal.find(params[:id])
    if goal.update(goal_params)
      render json: goal
    else
      render json: goal.errors, status: :unprocessable_entity
    end
  end

  #Delete a goal
  def destroy
    goal = Goal.find(params[:id])
    goal.destroy
    head :no_content
  end

  private

  def goal_params
    params.require(:goal).permit(:title, :calories, :start_date, :end_date, :status)
  end
end
