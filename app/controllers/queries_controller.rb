class QueriesController < ApplicationController
  def create
    query = Query.new
    redirect_to query_path(query)
  end

  def show
    # this displays the actual graph
  end

  def new_country
    # build url
  end

  def new_category
    #build url
  end

  def new_compare
    #build url
  end

  def build_graph
    # after URL has been built
    # http://localhost:3000/queries/build_graph?country1=NL&country2=DE&category1=Defense
    @country1 = params[:country1]
    @country2 = params[:country2]
    @category1 = params[:category1]
    @category2 = params[:category2]
  end
end
