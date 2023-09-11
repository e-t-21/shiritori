class WordsController < ApplicationController

  def index
  end

  def new
  end

  private

  def word_params
    params.require(:word).permit(:image).merge(word_id: current_word.id)
  end
end
