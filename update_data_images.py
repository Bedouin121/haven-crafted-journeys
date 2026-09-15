
mapping = {
    "photo-1591604129939-f1efa4d9f7fa": "/images/Hajj-Umrah/hajj-premium-shifting.png",
    "photo-1519817650390-64a93db51149": "/images/Hajj-Umrah/hajj-standard-shifting.png",
    "photo-1580418827493-f2b22c0a76cb": "/images/Hajj-Umrah/hajj-economy.png",
    "photo-1565019011521-b0575cbb57c8": "/images/Hajj-Umrah/umrah-luxury.png",
    "photo-1568905123350-eae2df1a4c99": "/images/Hajj-Umrah/umrah-family.png",
    "photo-1519677100203-a0e668c92439": "/images/Hajj-Umrah/umrah-express.png",
    "photo-1528181304800-259b08848526": "/images/Tourist-Visas/thailand-tourist.png",
    "photo-1596422846543-75c6fc197f07": "/images/Tourist-Visas/malaysia-tourist.png",
    "photo-1525625293386-3f8f99389edd": "/images/Tourist-Visas/singapore-tourist.png",
    "photo-1508804185872-d7badad00f7d": "/images/Tourist-Visas/china-tourist.png",
    "photo-1485871981521-5b1fd3805eee": "/images/Tourist-Visas/usa-tourist.png",
    "photo-1503614472-8c93d56cd601": "/images/Tourist-Visas/canada-tourist.png",
    "photo-1537996194471-e657df975ab4": "/images/Tourist-Visas/indonesia-tourist.png",
    "photo-1539768942893-daf53e448371": "/images/Tourist-Visas/egypt-tourist.png",
    "photo-1610294928006-8b6a7f671cd3": "/images/Tourist-Visas/armenia-tourist.png",
    "photo-1544735716-392fe2489ffa": "/images/Tourist-Visas/nepal-tourist.png",
    "photo-1580655653885-65763b2597d0": "/images/Tourist-Visas/bhutan-tourist.png",
    "photo-1514282401047-d79a71a590e8": "/images/Tourist-Visas/maldives-tourist.png",
    "photo-1512453979798-5ea266f8880c": "/images/Tourist-Visas/dubai-student.png",
    "photo-1544005313-94ddf0286df2": "/images/Testimonials/avatar-1.png",
    "photo-1494790108377-be9c29b29330": "/images/Testimonials/avatar-2.png",
    "photo-1500648767791-00dcc994a43e": "/images/Testimonials/avatar-3.png",
    "photo-1487412720507-e7ab37603c6f": "/images/Testimonials/avatar-4.png",
}

with open("C:/Users/Icarus/Downloads/Projects/haven-crafted-journeys/src/lib/data.ts", "r") as f:
    content = f.read()

for photo_id, new_path in mapping.items():
    # Replace U("photo_id", ...) or U("photo_id")
    # This regex looks for U("photo_id" + optional comma/args
    import re
    # Match U("id") or U("id", w)
    pattern = re.compile(rf'U\("{photo_id}"(,\s*\d+)?\)')
    content = pattern.sub(f'"{new_path}"', content)

with open("C:/Users/Icarus/Downloads/Projects/haven-crafted-journeys/src/lib/data.ts", "w") as f:
    f.write(content)
