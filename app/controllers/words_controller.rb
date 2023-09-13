class WordsController < ApplicationController
  def index
    @words = Word.all
  end

  def new
    @word = Word.new
  end

  def create
    @word = Word.new(word_params)
    if @word.save
      redirect_to words_path
    else
      render 'new'
    end
  end

  def show
    @word = Word.find(params[:id])
  end

  def edit
    @word = Word.find(params[:id])
  end

  def update
    @word = Word.find(params[:id])
    if @word.update(word_params)
      redirect_to words_path
    else
      render :edit
    end
  end

  private

  def word_params
    params.require(:word).permit(:name, :back_name1, :back_name2, :back_name3, :image, :name_audio, :back_name1_audio,
                                 :back_name2_audio, :back_name3_audio)
  end
end
