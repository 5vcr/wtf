class CreateStatistics < ActiveRecord::Migration[5.0]
  def change
    create_table :statistics do |t|
      t.string :geo
      t.string :cofog99
      t.string :time
      t.float :value
      t.string :unit

      t.timestamps
    end
  end
end
