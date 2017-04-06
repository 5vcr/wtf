class AddColumnToQueries < ActiveRecord::Migration[5.0]
  def change
    add_column :queries, :countries, :string
    add_column :queries, :categories, :string
  end
end
