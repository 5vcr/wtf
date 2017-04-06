require 'csv'

csv_text = File.read(Rails.root.join('config', 'data.csv'))
csv = CSV.parse(csv_text, :headers => true)

# TIME,GEO,    COFOG99,      COFOG99_LABEL, Value,  UNIT,        Flag and Footnotes =
# YEAR,COUNTRY,CATEGORY_CODE,CATEGORY,      VALUE,  UNIT, FOOTNOTES


# {"YEAR"=>"2014", "COUNTRY"=>"Belgium", "CATEGORY_CODE"=>"GF01", "CATEGORY"=>"General public services", "VALUE"=>"8.4", "UNIT"=>"Percentage of gross domestic product (GDP)", "FOOTNOTES"=>nil}

  # create_table "statistics", force: :cascade do |t|
  #   t.string   "geo"
  #   t.string   "cofog99"
  #   t.string   "time"
  #   t.string   "value"
  #   t.string   "unit"

Statistic.delete_all

csv.each do |row|
  Statistic.create({
    country: row.to_hash['COUNTRY'],
    category: row.to_hash['CATEGORY'],
    year: row.to_hash['YEAR'],
    value: row.to_hash['VALUE'].to_f,
    unit: row.to_hash['UNIT'],
  })
end
