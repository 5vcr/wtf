class Statistic < ApplicationRecord
  def self.countries
    all = self.all.pluck(:country).uniq.sort.map { |country| country.capitalize }

    more = ["Europe"]

    (more + all).flatten
  end
end
