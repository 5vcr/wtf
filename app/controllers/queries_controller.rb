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
    @country_data = Statistic.where(country: first_country, year: "2015")

    render "eurostats_show_country"
  end

  def eurostats_show_category
    # put category context generator logic here
    @query = Query.find(params[:id])

    first_category = @query.categories.split(",").first
    @category_data = Statistic.where(category: first_category, year: "2015")
    @category_data = Statistic.structure_category_data(@category_data)

    render "eurostats_show_category"
  end

  def eurostats_show_compare
    @query = Query.find(params[:id])

    countries = @query.countries.split(",")
    categories = @query.categories.split(",")

    countries = countries.map { |i| "%#{i}%" }
    categories = categories.map { |i| "%#{i}%" }

    @compare_data = Statistic.where('year = ? AND category ilike any ( array[?] )', '2015', categories)
    @compare_data = @compare_data.where('country ilike any ( array[?] )', countries)
    @compare_data = @compare_data.select { |data| data.category_code.size <= 4 }
    @compare_data = @compare_data.to_json(:except => [ :year, :id, :created_at, :updated_at])
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
