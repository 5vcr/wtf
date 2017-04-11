class Statistic < ApplicationRecord
  def self.countries
    all = self.all.pluck(:country).uniq.sort

    more = ["Europe"]

    (more + all).flatten
  end

  def self.structure_compare_data
    @compare_data.to_a
  end

# controller should know what data, but not how you actually generate or create the data
# build one method for data structure for each graph
# call this method inside respective controller method

end
