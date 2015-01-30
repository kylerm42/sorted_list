class ListItem < ActiveRecord::Base
  validates :title, :details, presence: true
  validates :position, numericality: { only_integer: true, allow_nil: true }
end
