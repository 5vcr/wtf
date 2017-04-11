class Query < ApplicationRecord
  has_many :feedbacks

  def countries_display
    self.countries.split(",").map { |country| country.capitalize }
  end

  def categories_display
    self.categories.split(",").map { |category| category.capitalize }
  end
end
