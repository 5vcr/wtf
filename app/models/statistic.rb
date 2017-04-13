class Statistic < ApplicationRecord
  def self.countries
    all = self.all.pluck(:country).uniq.sort
    more = ["Europe"]
    (more + all).flatten
  end

  def self.structure_country_data(array)
    root_statistics = array.where(parent: "")

   teletubbies =  {
      VALUE: 50, #arbitrary value, write method to calculate actual value
      COUNTRY: array.first.country,
      children: root_statistics.map do |statistic|
        {
          CATEGORY_CODE: statistic.category_code,
          CATEGORY: statistic.category,
          VALUE: statistic.value,
          children: statistic.children.map do |statistic_child|
            # raise
            # raise
            {
              CATEGORY_CODE: statistic_child.category_code,
              CATEGORY: statistic_child.category,
              VALUE: statistic_child.value
            }
          end
        }
      end
    }
    teletubbies.to_json
  end

  def self.structure_category_data(array)
    array.map do |statistic|
      {
        country: statistic.country,
        category: statistic.value,
        country_code: statistic.country_code
      }
    end.to_json
  end

  def children
    Statistic.select('DISTINCT ON (category_code) *').where(parent: self.category_code, country: self.country)
  end
# controller should know what data, but not how you actually generate or create the data
# build one method for data structure for each graph
# call this method inside respective controller method
end



# var treeData =
#  {
#    “name”: “Top Level”,
#    “children”: [
#      {
#        “name”: “Level 2: A”,
#        “children”: [
#          { “name”: “Son of A” },
#          { “name”: “Daughter of A” }
#        ]
#      },
#      { “name”: “Level 2: B” }
#    ]
#  };
