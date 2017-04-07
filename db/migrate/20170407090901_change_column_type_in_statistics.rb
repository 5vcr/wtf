class ChangeColumnTypeInStatistics < ActiveRecord::Migration[5.0]
  def change
    change_column :statistics, :category_code, :string
  end
end
