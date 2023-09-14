class GamesController < ApplicationController
  def index
  end

  def play
    # データベースから単語を表示
    @random_words = Word.order(Arel.sql('RAND()')).limit(18)

    def get_unselected_images
      @unselected_images = Word.where(selected: false)
      render json: @unselected_images
    end

  current_character = session[:current_character]

    # クライアント側にデータを渡す
    respond_to do |format|
      format.html do
        render 'play', locals: { current_character: current_character }
      end
    end
  end
end