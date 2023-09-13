class Word < ApplicationRecord
  has_one_attached :image
  has_one_attached :name_audio
  has_one_attached :back_name1_audio
  has_one_attached :back_name2_audio
  has_one_attached :back_name3_audio

  validates :name, :image, presence: true
end
