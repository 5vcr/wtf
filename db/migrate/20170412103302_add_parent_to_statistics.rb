class AddParentToStatistics < ActiveRecord::Migration[5.0]
  def change
    add_column :statistics, :parent, :string
  end
end
