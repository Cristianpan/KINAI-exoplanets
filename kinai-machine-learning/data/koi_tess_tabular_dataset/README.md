# 🪐 KOI–TESS Unified Exoplanet Dataset (Tabular)

## 1. Origin and Context

This dataset merges data from NASA’s Kepler (KOI) and TESS (Transiting Exoplanet Survey Satellite) missions.
It provides standardized tabular astrophysical parameters for machine learning models focused on physical feature-based exoplanet classification.

By combining historical Kepler data with modern TESS detections, it enables comparison and transfer learning across missions.

## 2. General Structure
| Field | Description | Unit / Type | Source |
| :--- | :--- | :--- | :--- |
| `search_id` | Stellar system identifier (KIC or TIC) | Text | KOI / TESS |
| `num_planet` | Planet number within the system | Integer | Derived |
| `disposition` | Candidate status: 1 = Confirmed, 2 = Candidate, 0 = False positive | Categorical | KOI / TESS |
| `ror` | Planet-to-star radius ratio (Rₚ/Rₛ) | Dimensionless | Derived |
| `stellar_mass` | Stellar mass estimate | M☉ (solar masses) | KOI / TESS |
| `ss_gravity` | Stellar surface gravity | log₁₀(cm/s²) | KOI / TESS |
| `period` | Orbital period | Days | KOI / TESS |
| `duration` | Transit duration | Hours | KOI / TESS |
| `transit_epoch` | Transit reference epoch | BKJD or BJD | KOI / TESS |

## 4. Example Record
```json
{
  "search_id": "KIC 10797460",
  "num_planet": 1,
  "disposition": 1,
  "ror": 0.022344,
  "stellar_mass": 0.919,
  "ss_gravity": 4.467,
  "period": 9.48803557,
  "duration": 2.9575,
  "transit_epoch": 2455003.539
}
```

## 5. Dataset Purpose

This dataset is suitable for:

- Training tabular machine learning models (e.g., Random Forest, XGBoost).

- Studying correlations between planetary and stellar features.

- Comparative analysis of detection performance between missions.

- Hybrid model training when combined with light curve data.

## 6. Scientific Relevance

This dataset facilitates:

- Physical characterization of exoplanet systems.

- Robustness testing across missions with different instruments.

- Identification of observational biases and instrument calibration differences.

- Use in interpretable AI (XAI) approaches for astrophysics.

## 7. Potential Applications

- Planet classification using physical features.

- Feature engineering and cross-mission validation.

- Comparative stellar property analysis between KOI and TESS.

- Habitability estimation and orbital dynamics studies.

## 8. Credits and References

- Sources:

    - [NASA Exoplanet Archive - Kepler Objects of Interest (KOI)](https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=cumulative)
    - [NASA Exoplanet Archive ExoFOP/TESS - TESS Objects of Interest (TOI)](https://exofop.ipac.caltech.edu/tess/view_toi.php)