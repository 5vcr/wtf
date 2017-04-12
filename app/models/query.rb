class Query < ApplicationRecord
  has_many :feedbacks

  def countries_display
    self.countries.split(",").map { |country| country.capitalize }
  end

  def categories_display
    ["General public services", "Defence", "Public order and safety", "Economic affairs"].map { |category| category.capitalize }
  end
end
