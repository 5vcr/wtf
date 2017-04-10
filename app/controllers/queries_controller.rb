class QueriesController < ApplicationController
  def create
    if query_params[:countries].is_a?(Array)
      sorted_countries = query_params[:countries]
    else
      sorted_countries = [query_params[:countries]]
    end

    sorted_countries = sorted_countries.sort.uniq.map { |country| country.parameterize }

    sorted_countries_str = sorted_countries.join(",")

    sorted_categories = query_params[:categories].sort.uniq.join(",")

    if query_params[:categories]
      sorted_categories = query_params[:categories].sort.uniq.join(",")
    end

    previous = Query.where(countries: sorted_countries_str, categories: sorted_categories).first

    if previous
      query = previous
    else
      query = Query.create(countries: sorted_countries_str, categories: sorted_categories)
    end

    if sorted_countries.any?
      redirect_to country_path(query)
      return
    end

    if sorted_categories.any?
      redirect_to category_path(query)
      return
    end

    if sorted_categories.any? and sorted_countries.any?
      redirect_to compare_path(query)
      return
    end
  end

  def eurostats_show_country
    @query = Query.find(params[:id])
    first_country = @query.countries.split(",").first.capitalize
    @data = Statistic.where(country: first_country)

    render "eurostats_show_country"
  end

  def eurostats_show_category
    query = Query.find(params[:id])

    first_categories = query.categories.split(",").first
    @data = Statistic.where(categories: first_categories, year: 2015)

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
    params.require(:query).permit(:countries, {:countries => []}, {:categories => []})
  end
end
