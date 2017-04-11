class Statistic < ApplicationRecord
  def self.countries
    all = self.all.pluck(:country).uniq.sort

    more = ["Europe"]

    (more + all).flatten
  end
end
