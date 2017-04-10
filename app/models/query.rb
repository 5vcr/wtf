class Query < ApplicationRecord
  has_many :feedbacks

  def countries_display
    self.countries.split(",").map { |country| country.capitalize }
  end
end
