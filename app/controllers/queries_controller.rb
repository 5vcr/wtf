class QueriesController < ApplicationController
  def create
    sorted_countries = query_params[:countries].sort.uniq.join(",")
    sorted_categories = query_params[:categories].sort.uniq.join(",")

    previous = Query.where(countries: sorted_countries, categories: sorted_categories)

    if previous
      query = previous
    else
      query = Query.create(countries: sorted_countries, categories: sorted_categories)
    end

    if query_params[:countries].sort.uniq.any?
      redirect_to eurostats_country_show_path(query)
    end

    if query_params[:categories].sort.uniq.any?
      redirect_to eurostats_category_show_path(query)
    end

    if query_params[:categories].sort.uniq.any? and query_params[:countries].sort.uniq.any?
      redirect_to eurostats_compare_show_path(query)
    end
  end

  def eurostats_show_country
    # query = Query.find(params[:id])
    # first_country = query.countries.split(",").first
    # @country1 = first_country

    @country1 = params[:country1]
    @data = Statistic.where(country: @country1)
    render "eurostats_show_country"
  end

  def eurostats_show_category
    # query = Query.find(params[:id])
    # first_categories = query.categories.split(",").first
    # @category1 = first_categories

    @category1 = params[:category1]
    @data = Statistic.where("category ILIKE ?", "%#{@category1}%")
    render "eurostats_show_category"
  end

  def eurostats_show_compare
    @countries = params[:countries]
    @categories = params[:categories]

    @data = Statistic.where(country: @countries, categories: @categories)

    render "eurostats_show_compare"
  end

  def new_country
    @query = Query.new
  end

  def new_category
    @query = Query.new
  end

  def new_compare
    @query = Query.new
  end

  private

  def query_params
    params.require(:query).permit()
  end
end
