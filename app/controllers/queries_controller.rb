class QueriesController < ApplicationController
  def create
    # make a helper function that takes category or country and converts to array
    if query_params[:countries].is_a?(Array)
      sorted_countries = query_params[:countries]
    else
      sorted_countries = [query_params[:countries]]
    end

    sorted_countries = sorted_countries.sort.uniq.map { |country| country.parameterize }
    sorted_countries_str = sorted_countries.join(",").capitalize

    if query_params[:categories].is_a?(Array)
      sorted_categories = query_params[:categories]
    else
      sorted_categories = [query_params[:categories]]
    end

    sorted_categories_str = sorted_categories.first

    # if query_params[:categories]
    #   sorted_categories = query_params[:categories].sort.uniq.join(",")
    # end

    previous = Query.where(countries: sorted_countries_str, categories: sorted_categories).first

    if previous
      query = previous
    else
      query = Query.create(countries: sorted_countries_str, categories: sorted_categories)
    end

    # this method catches too many things; redirects incorrectly
    if sorted_countries.any? && sorted_countries != [""]
      redirect_to country_path(query)
      return
    end

    if sorted_categories.any? && sorted_categories != [""]
      redirect_to category_path(query)
      return
    end

    # if previous two if statements are false, default to below

    if sorted_categories.any? and sorted_countries.any?
      redirect_to compare_path(query)
      return
    end
  end

  def eurostats_show_country
    @query = Query.find(params[:id])

    first_country = @query.countries.split(",").first
    @data = Statistic.where(country: first_country)
    render "eurostats_show_country"
  end

  def eurostats_show_category
    @query = Query.find(params[:id])

    first_category = @query.categories.split(",").first
    @data = Statistic.where(category: first_category)
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
    params.require(:query).permit(:countries, {:countries => []}, :categories, {:categories => []})
  end
end
