# 🪐 KOI Exoplanet Light Curves Dataset (Kepler Mission)

## 1. Origin and Context

This dataset originates from the NASA Exoplanet Archive, specifically the Kepler Objects of Interest (KOI) catalog.
It supports AI-based exoplanet detection and classification using normalized light curves from the Kepler Space Telescope.
We use this data to train a 1D Convolutional Neural Network (CNN1D) that combines tabular and time-series data.

Our neural architecture is based on the models proposed by:

- [Shallue & Vanderburg (2018): “Identifying Exoplanets with Deep Learning”](https://arxiv.org/pdf/1712.05044)
- [Dattilo et al. (2019): “Identifying Exoplanets with Deep Learning II: Two New Super-Earths Uncovered by a Neural Network in K2 Data”](https://arxiv.org/pdf/1903.10507)

These works introduced the AstroNet and AstroNet-K2 architectures, which process light curves through two independent convolutional channels ("global" and "local" views) before combining them in shared dense layers. Our model follows this dual-view CNN design to identify transiting exoplanet candidates and reject false positives.

## 2. Estructura general
| Field | Description | Unit / Type | Source |
| :--- | :--- | :--- | :--- |
| `search_id` | Internal identifier (KIC ID) for the stellar system | Text | KOI |
| `num_planet` | Planet number within the system | Integer | Derived |
| `disposition` | Candidate status: 1 = Confirmed, 0 = False positive, Candidate = 2 | Integeer | Exoplanet Archive Disposition |
| `ror` (`koi_ror`) | Planet-to-star radius ratio | Dimensionless | KOI |
| `stellar_mass` (`koi_smass`) | Stellar mass estimate | M☉ (solar masses) | KOI |
| `ss_gravity` (`koi_slogg`) | Stellar surface gravity | log₁₀(cm/s²) | KOI |
| `period` (`koi_period`) | Orbital period | Days | KOI |
| `duration` (`koi_duration`) | Transit duration | Hours | KOI |
| `transit_epoch` (`koi_time0bk`) | Transit reference epoch | BKJD (Barycentric Kepler Julian Date) | KOI |
| `global_view` | Normalized global light curve | JSON | Processed locally |
| `local_view` | Cropped light curve centered on transit | JSON | Processed locally |

## 3. Light Curve Representations (global_view and local_view)

Two normalized signal representations are provided:

- Global View: Full flux variation including stellar variability and potential transit dips.

- Local View: Window centered on the detected transit to highlight shape, depth, and symmetry.

4. Example Record
```json
{
  "search_id": "KIC 9838468",
  "num_planet": 1,
  "disposition": 1,
  "ror": 0.012628,
  "stellar_mass": 0.954,
  "ss_gravity": 4.309,
  "period": 54.4099612,
  "duration": 9.314,
  "transit_epoch": 2455008.40307,
  "global_view": "[5.123, 23.21,...]" // 1001 values
  "local_view": "[1.21, 5.32,...]" // 101 values
}
```

## 5. Dataset Purpose

This dataset is intended for supervised learning tasks such as:

- Binary classification of exoplanet candidates.

- Training 1D convolutional neural networks (CNN1Ds) for light curve analysis.

- Comparative evaluation of deep and tree-based models.

## 6. Scientific Relevance

The dataset supports:

- Automated exoplanet detection and validation.

- Reduction of manual vetting workload for astronomers.

- Exploration of relationships between stellar and photometric parameters.

## 7. Potential Applications

- Classification of light curves using CNNs.

- Visualization and period analysis of transit events.

- Hybrid model development (tabular + time series).

- Educational use in astrophysical machine learning.

## 8. Credits and References

[Source: NASA Exoplanet Archive - Kepler Objects of Interest (KOI)](https://exoplanetarchive.ipac.caltech.edu/bulk_data_download/Kepler_KOI_wget.bat)