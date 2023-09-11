class WordsController < ApplicationController
  def new
    @word = Word.new
  end

  def create
    @word = Word.new(word_params)
    if @word.save
      redirect_to @word
    else
      render 'new'
    end
  end

  private

  def word_params
    params.require(:word).permit(:name, :name_kana, :back_name1, :back_name1_kana, :back_name2, :back_name2_kana, :back_name3, :back_name3_kana, :back_name4, :back_name4_kana, :image)
  end
end