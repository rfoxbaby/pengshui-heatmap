import json
import random

def generate_dense_heatmap_data():
    lng_min, lng_max = 108.14, 108.18
    lat_min, lat_max = 29.25, 29.32
    return [
        {
            "lng": round(random.uniform(lng_min, lng_max), 6),
            "lat": round(random.uniform(lat_min, lat_max), 6),
            "count": random.randint(20, 100)
        }
        for _ in range(100)
    ]

with open("heatmap-data.json", "w", encoding="utf-8") as f:
    json.dump(generate_dense_heatmap_data(), f, indent=2, ensure_ascii=False)
