json.array!(@items) do |item|
  json.extract! item, :id, :aisle_id, :name, :brand, :price, :size, :type, :sale_pct, :img_url
  json.url item_url(item, format: :json)
end
