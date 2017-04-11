class QueriesController < ApplicationController
  def create
    # make a helper function that takes category or country and converts to array
    sorted_countries = query_params[:countries].is_a?(Array) ? query_params[:countries] : [query_params[:countries]]
    sorted_countries = sorted_countries.sort.uniq
    # sorted_countries = sorted_countries.sort.uniq.map { |country| country.parameterize }
    sorted_countries = sorted_countries.select { |i| i.present? }
    sorted_countries_str = sorted_countries.join(",")

    sorted_categories = query_params[:categories].is_a?(Array) ? query_params[:categories] : [query_params[:categories]]
    sorted_categories = sorted_categories.sort.uniq
    # sorted_categories = sorted_categories.sort.uniq.map { |category| category.parameterize }
    sorted_categories = sorted_categories.select { |i| i.present? }
    sorted_categories_str = sorted_categories.join(",")


    # create or get a query
    previous = Query.where(countries: sorted_countries_str, categories: sorted_categories_str).first

    if previous
      query = previous
    else
      query = Query.create(countries: sorted_countries_str, categories: sorted_categories_str)
    end

    # work with country
    if sorted_countries.any? and sorted_categories.empty?
      return redirect_to country_path(query)
    end

    # categories
    if sorted_countries.empty? and sorted_categories.any?
      return redirect_to category_path(query)
    end

    # compare
    if sorted_countries.any? and sorted_categories.any?
      return redirect_to compare_path(query)
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
    # first_category = @query.categories.split(",").first.capitalize

    @data = Statistic.where(category: first_category)

    render "eurostats_show_category"
  end

  def eurostats_show_compare
    @query = Query.find(params[:id])

    countries = @query.countries.split(",")
    categories = @query.categories.split(",")

    countries = countries.map { |i| "%#{i}%" }
    categories = categories.map { |i| "%#{i}%" }

    @data = Statistic.where('category ilike any ( array[?] )', categories)
    @data = @data.where('country ilike any ( array[?] )', countries)

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
