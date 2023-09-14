class Word < ApplicationRecord
  has_one_attached :image
  has_one_attached :name_audio
  has_one_attached :back_name1_audio
  has_one_attached :back_name2_audio
  has_one_attached :back_name3_audio

  validates :name, :image, presence: true


  # カスタムメソッドを追加
  def sanitized_hiragana_start
    # :name カラムから全角記号を除外し、カタカナをひらがなに変換
    hiragana_name = name.tr("ァ-ン", "ぁ-ん").gsub(/[[:punct:]]/, "")
    # 最初の文字を取得
    hiragana_name.chars.first
  end
end
