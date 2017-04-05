class Feedback < ApplicationRecord
  belongs_to :user
  belongs_to :query
end
