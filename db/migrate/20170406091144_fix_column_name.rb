class FixColumnName < ActiveRecord::Migration[5.0]
  def change
    rename_column :statistics, :geo, :country
    rename_column :statistics, :cofog99, :category
    rename_column :statistics, :time, :year
  end
end
