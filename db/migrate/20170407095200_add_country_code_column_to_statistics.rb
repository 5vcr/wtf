class AddCountryCodeColumnToStatistics < ActiveRecord::Migration[5.0]
  def change
    add_column :statistics, :country_code, :integer
  end
end
