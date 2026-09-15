#!/bin/bash
# Mapping: "UnsplashID" "TargetFilename" "Directory"
mapping=(
  "photo-1591604129939-f1efa4d9f7fa" "hajj-premium-shifting.png" "Hajj-Umrah"
  "photo-1519817650390-64a93db51149" "hajj-standard-shifting.png" "Hajj-Umrah"
  "photo-1580418827493-f2b22c0a76cb" "hajj-economy.png" "Hajj-Umrah"
  "photo-1565019011521-b0575cbb57c8" "umrah-luxury.png" "Hajj-Umrah"
  "photo-1568905123350-eae2df1a4c99" "umrah-family.png" "Hajj-Umrah"
  "photo-1519677100203-a0e668c92439" "umrah-express.png" "Hajj-Umrah"
  "photo-1528181304800-259b08848526" "thailand-tourist.png" "Tourist-Visas"
  "photo-1596422846543-75c6fc197f07" "malaysia-tourist.png" "Tourist-Visas"
  "photo-1525625293386-3f8f99389edd" "singapore-tourist.png" "Tourist-Visas"
  "photo-1508804185872-d7badad00f7d" "china-tourist.png" "Tourist-Visas"
  "photo-1485871981521-5b1fd3805eee" "usa-tourist.png" "Tourist-Visas"
  "photo-1503614472-8c93d56cd601" "canada-tourist.png" "Tourist-Visas"
  "photo-1537996194471-e657df975ab4" "indonesia-tourist.png" "Tourist-Visas"
  "photo-1539768942893-daf53e448371" "egypt-tourist.png" "Tourist-Visas"
  "photo-1610294928006-8b6a7f671cd3" "armenia-tourist.png" "Tourist-Visas"
  "photo-1544735716-392fe2489ffa" "nepal-tourist.png" "Tourist-Visas"
  "photo-1580655653885-65763b2597d0" "bhutan-tourist.png" "Tourist-Visas"
  "photo-1514282401047-d79a71a590e8" "maldives-tourist.png" "Tourist-Visas"
  "photo-1512453979798-5ea266f8880c" "dubai-student.png" "Tourist-Visas"
)

# Download in array sets of 3
for (( i=0; i<${#mapping[@]}; i+=3 )); do
  id="${mapping[i]}"
  filename="${mapping[i+1]}"
  dir="${mapping[i+2]}"
  
  url="https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80"
  echo "Downloading $filename..."
  curl -s -o "public/images/$dir/$filename" "$url"
done
