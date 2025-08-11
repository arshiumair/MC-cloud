def recommend(app_type, budget, region_preference):
    if budget < 6:
        cloud = "AWS Lightsail"
        region = "Mumbai" if region_preference == "Asia" else "Frankfurt"
        cost = "$5.50"
    elif app_type == "Static Website":
        cloud = "Azure Static Web Apps"
        cost = "$7.00"
    else:
        cloud = "GCP Compute Engine"
        cost = "$8.20"

    return {
        "cloud": cloud,
        "region": region,
        "estimated_cost": cost
    }
