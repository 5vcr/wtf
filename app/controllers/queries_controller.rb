class QueriesController < ApplicationController
  def create
    query = Query.new
    redirect_to query_path(query)
  end

  def show
  end

  def new_country
  end

  def new_category
  end

  def new_compare
  end
end
