class CreateGoals < ActiveRecord::Migration[7.2]
  def change
    create_table :goals do |t|
      t.string :title
      t.integer :calories
      t.date :start_date
      t.date :end_date
      t.string :status

      t.timestamps
    end
  end
end
