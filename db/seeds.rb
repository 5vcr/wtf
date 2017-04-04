require 'csv'

csv_text = File.read(Rails.root.join('config', 'data.csv'))
csv = CSV.parse(csv_text, :headers => true)

# {"TIME"=>"2014", "GEO"=>"Belgium", "COFOG99"=>"GF01", "COFOG99_LABEL"=>"General public services", "Value"=>"8.4", "UNIT"=>"Percentage of gross domestic product (GDP)", "Flag and Footnotes"=>nil}

  # create_table "statistics", force: :cascade do |t|
  #   t.string   "geo"
  #   t.string   "cofog99"
  #   t.string   "time"
  #   t.string   "value"
  #   t.string   "unit"

Statistic.delete_all

csv.each do |row|
  Statistic.create({
    geo: row.to_hash['GEO'],
    cofog99: row.to_hash['COFOG99'],
    time: row.to_hash['TIME'],
    value: row.to_hash['Value'].to_f,
    unit: row.to_hash['UNIT'],
  })
end
