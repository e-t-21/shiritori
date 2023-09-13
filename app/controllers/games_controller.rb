class GamesController < ApplicationController
  def index
  end

  def play
    @random_words = Word.order(Arel.sql('RAND()')).limit(30)
  end
end
