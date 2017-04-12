class Statistic < ApplicationRecord
  def self.countries
    all = self.all.pluck(:country).uniq.sort
    more = ["Europe"]
    (more + all).flatten
  end

  # def self.structure_compare_data
  #   @compare_data.to_a
  # end

  def self.structure_category_data(array)
    @category_hash = array.map do |statistic|
      {
        country: statistic.country,
        category: statistic.value,
        country_code: statistic.country_code
      }
    end
    @category_hash.to_json
  end

  def self.structure_country_data

  end
# controller should know what data, but not how you actually generate or create the data
# build one method for data structure for each graph
# call this method inside respective controller method
end
