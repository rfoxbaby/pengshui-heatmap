import json
import random
from shapely.geometry import Point, Polygon

hot_centers = [
    (108.1666, 29.2935),
    (108.1722, 29.2970),
    (108.1612, 29.2901),
    (108.1555, 29.2800),
    (108.1500, 29.2650),
]

polygon_coords = [
    (108.144, 29.295),
    (108.148, 29.275),
    (108.155, 29.263),
    (108.160, 29.260),
    (108.168, 29.262),
    (108.175, 29.270),
    (108.177, 29.278),
    (108.175, 29.288),
    (108.171, 29.296),
    (108.165, 29.298),
    (108.155, 29.300),
    (108.148, 29.298)
]
boundary = Polygon(polygon_coords)

def inside(lng, lat):
    return boundary.contains(Point(lng, lat))

def generate_clean_heatmap_data():
    data = []

    for center in hot_centers:
        added = 0
        while added < 150:
            lng = random.gauss(center[0], 0.0015)
            lat = random.gauss(center[1], 0.0012)
            if inside(lng, lat):
                data.append({
                    "lng": round(lng, 6),
                    "lat": round(lat, 6),
                    "count": random.randint(70, 100)
                })
                added += 1

    added = 0
    while added < 200:
        lng = random.uniform(108.14, 108.18)
        lat = random.uniform(29.25, 29.32)
        if inside(lng, lat):
            data.append({
                "lng": round(lng, 6),
                "lat": round(lat, 6),
                "count": random.randint(30, 70)
            })
            added += 1

    return data

with open("heatmap-data.json", "w", encoding="utf-8") as f:
    json.dump(generate_clean_heatmap_data(), f, indent=2, ensure_ascii=False)
