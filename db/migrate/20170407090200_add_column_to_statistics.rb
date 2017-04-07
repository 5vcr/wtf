class AddColumnToStatistics < ActiveRecord::Migration[5.0]
  def change
    add_column :statistics, :category_code, :string
  end
end
