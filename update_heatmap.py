import json
import random

hot_centers = [
    (108.1666, 29.2935),
    (108.1722, 29.2970),
    (108.1612, 29.2901),
    (108.1555, 29.2800),
    (108.1500, 29.2650),
]

def generate_high_density_heatmap():
    data = []
    for center in hot_centers:
        for _ in range(random.randint(100, 180)):
            lng = random.gauss(center[0], 0.0015)
            lat = random.gauss(center[1], 0.0012)
            count = random.randint(70, 100)
            data.append({ "lng": round(lng, 6), "lat": round(lat, 6), "count": count })

    for _ in range(200):
        lng = round(random.uniform(108.14, 108.18), 6)
        lat = round(random.uniform(29.25, 29.32), 6)
        count = random.randint(30, 70)
        data.append({ "lng": lng, "lat": lat, "count": count })

    return data

with open("heatmap-data.json", "w", encoding="utf-8") as f:
    json.dump(generate_high_density_heatmap(), f, indent=2, ensure_ascii=False)
