class Api::CoinsController < ApplicationController
  before_action :set_coin, only: [:update, :destroy]
  BASE_URL = 'https://api.coinmarketcap.com/v2/'

  def index
    listings = HTTParty.get("#{BASE_URL}ticker")['data'].values
    user_coins = current_user.coins
    user_coins.each do |coin| 
      res_coin = listings.find { |c| c['id'] === coin.cmc_id }
      coin.update(price: res_coin['quotes']['USD']['price'])
    end

    render json: current_user.coins
  end

  def create
    # make API call to get coin's data, if that coin exists, update it, create watched coin for user
    # if it doens't exist, we will create it
    cmc_id = params[:coin].upcase
    listings = HTTParty.get("#{BASE_URL}listings")
    listing = listings['data'].find { |l| l['symbol'] == cmc_id }
    res = HTTParty.get("#{BASE_URL}/ticker/#{listing['id']}")
      if coin = Coin.create_by_cmc_id(res)
        watched = WatchedCoin.find_or_create_by(coin_id: coin.id, user_id: current_user.id)
        watched.update(initial_price: coin.price) if watched.intitial_price.nil?
        render json: coin
      else
        render json: { errors: 'Coin Not Found'}, status: 422

  end

  def show
    res = HTTParty.get("#{BASE_URL}ticker/#{params}[:id])")
    render json: res['data']
  end

  def update
    current_user.watched_coins.find_by(coin_id: @coin.id).destroy
    # no longer watching it
  end

  def destroy
    @coin.destroy
  end

  private
    def set_coin
      @coin = Coin.find(params[:id])
end
