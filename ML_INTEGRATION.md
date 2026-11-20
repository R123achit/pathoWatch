# PathoWatch ML API Integration Guide

## Overview

This guide explains how the PathoWatch website integrates with the ML API for predictions, risk assessment, MDR classification, and surveillance analysis.

### Architecture

```
┌─────────────────────────────────────────┐
│ Browser (User)                          │
│ https://your-app.vercel.app             │
└──────────────┬──────────────────────────┘
               │ HTTP GET/POST (no secrets)
               ▼
┌─────────────────────────────────────────┐
│ Next.js Backend (Vercel)                │
│ Route Handlers (/api/ml/*)              │
│ - Server-side environment variables     │
│ - Secure API key handling               │
└──────────────┬──────────────────────────┘
               │ HTTP POST + X-API-Key
               ▼
┌─────────────────────────────────────────┐
│ ML API (Render)                         │
│ https://pathowatch-ml-api.onrender.com  │
│ - LightGBM models                       │
│ - Time series forecasting               │
│ - MDR classification                    │
└─────────────────────────────────────────┘
```

---

## Setup

### 1. Environment Variables

Add these to your `.env.local` (local development) and Vercel dashboard (production):

```bash
# .env.local
PATHOWATCH_ML_API_URL=https://pathowatch-ml-api.onrender.com
PATHOWATCH_ML_API_KEY=your-api-key-here
```

**Important:**
- ❌ Do NOT use `NEXT_PUBLIC_` prefix (keeps API key secret)
- ❌ Do NOT commit `.env.local` to git (it's in .gitignore)
- ✅ Add to Vercel Settings → Environment Variables

### 2. Vercel Deployment

1. Go to Vercel Dashboard
2. Select your PathoWatch project
3. Settings → Environment Variables
4. Add:
   - `PATHOWATCH_ML_API_URL` = `https://pathowatch-ml-api.onrender.com`
   - `PATHOWATCH_ML_API_KEY` = (your API key)
5. Deploy

---

## Available Endpoints

All endpoints are exposed via Next.js Route Handlers at `/api/ml/*`. They securely call the backend ML API.

### 1. Model Info
**Endpoint:** `GET /api/ml/model-info`

Get information about the deployed ML model.

**Response:**
```json
{
  "version": "2026-01-15",
  "algorithm": "LightGBM",
  "feature_set": "adaptive_risk_model_v1",
  "trained_on_years": [2022, 2023, 2024],
  "validation": {
    "auroc": 0.89,
    "calibration_error": 0.042,
    "brier": 0.18
  }
}
```

**Usage:**
```javascript
const response = await fetch('/api/ml/model-info');
const modelInfo = await response.json();
console.log(`Model version: ${modelInfo.version}`);
```

---

### 2. Risk Prediction
**Endpoint:** `POST /api/ml/risk-predict`

Predict MDR risk before susceptibility results are available.

**Request:**
```javascript
{
  "species": "K. pneumoniae",           // Required
  "sample_type": "Blood",               // Optional
  "ward": "Medicine ICU",               // Optional
  "patient_type": "Inpatient",          // Optional
  "age": 67,                            // Optional (0-120)
  "age_group": "65 to 84 Years",        // Optional
  "gender": "Male",                     // Optional
  "year": 2026,                         // Optional
  "local_history": {                    // Optional
    "location": { "isolates": 100, "mdr": 30 },
    "location_species": { "isolates": 45, "mdr": 15 },
    "location_species_source": { "isolates": 20, "mdr": 8 },
    "location_species_ward": { "isolates": 15, "mdr": 6 },
    "location_species_last_12_months": { "isolates": 8, "mdr": 3 }
  }
}
```

**Response:**
```json
{
  "supported": true,
  "mdr_probability": 0.42,
  "risk_band": "Moderate",
  "predicted_mdr": false,
  "threshold": 0.38,
  "typical_for_species": 0.35,
  "interpretation": "Estimated MDR likelihood 42% (higher than typical 35% for this species)",
  "inputs_used": {
    "species": "K. pneumoniae",
    "source_group": "CVS",
    "speciality": "Medicine ICU",
    "patient_type": "Inpatient",
    "age_group": "65 to 84 Years",
    "gender": "Male"
  },
  "history_source": "this site's own lab history",
  "model_version": "2026-01-15"
}
```

**Usage:**
```javascript
// From React component (client-side)
async function getRiskPrediction(isolateData) {
  const response = await fetch('/api/ml/risk-predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(isolateData),
  });

  if (!response.ok) throw new Error('Risk prediction failed');
  
  const result = await response.json();
  console.log(`MDR Risk: ${(result.mdr_probability * 100).toFixed(1)}%`);
  console.log(`Risk Band: ${result.risk_band}`);
  return result;
}
```

---

### 3. MDR Classification
**Endpoint:** `POST /api/ml/mdr-classify`

Classify isolates as MDR based on susceptibility results.

**Request:**
```javascript
{
  "isolates": [
    {
      "id": "ISO001",
      "pathogen": "K. pneumoniae",
      "results": {
        "Meropenem": "R",
        "Ciprofloxacin": "R",
        "Ceftriaxone": "R"
      }
    }
  ]
}
```

**Response:**
```json
{
  "results": [
    {
      "id": "ISO001",
      "mdr": true,
      "assessed": true,
      "non_susceptible_categories": ["Beta-lactams", "Fluoroquinolones", "Third-generation Cephalosporins"]
    }
  ],
  "summary": {
    "isolates": 1,
    "assessed": 1,
    "mdr": 1
  }
}
```

**Usage:**
```javascript
async function classifyIsolates(isolates) {
  const response = await fetch('/api/ml/mdr-classify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isolates }),
  });

  const result = await response.json();
  console.log(`${result.summary.mdr} out of ${result.summary.isolates} are MDR`);
  return result;
}
```

---

### 4. Surveillance Analysis
**Endpoint:** `POST /api/ml/surveillance-analyze`

Analyze surveillance data for anomalies, hotspots, and trends.

**Request:**
```javascript
{
  "areas": [
    {
      "area_id": "ghaziabad-001",
      "area_name": "Ghaziabad",
      "series": [
        {
          "period": "2025-10",
          "isolates": 150,
          "mdr_cases": 45
        },
        {
          "period": "2025-11",
          "isolates": 160,
          "mdr_cases": 52
        },
        {
          "period": "2025-12",
          "isolates": 155,
          "mdr_cases": 48
        }
      ]
    }
  ],
  "horizon": 3  // Forecast 3 months ahead
}
```

**Response:**
```json
{
  "areas": [
    {
      "area_id": "ghaziabad-001",
      "area_name": "Ghaziabad",
      "anomalies": [
        {
          "type": "spike",
          "period": "2025-11",
          "value": 52,
          "expected": 46.5,
          "severity": "moderate"
        }
      ],
      "forecast": [48, 49, 51],
      "forecast_lower": [42, 43, 44],
      "forecast_upper": [54, 55, 58],
      "trend": "increasing"
    }
  ],
  "model_version": "2026-01-15",
  "generated_at": "2026-01-15T10:30:00Z"
}
```

---

### 5. Time Series Forecast
**Endpoint:** `POST /api/ml/forecast`

Generate forecasts for any time series with prediction intervals.

**Request:**
```javascript
{
  "values": [45, 48, 52, 49, 51, 53],  // At least 3 values
  "horizon": 3,                         // 1-24 periods
  "upper_bound": null                   // Optional: cap forecasts at this value
}
```

**Response:**
```json
{
  "method": "ensemble (mean of last 3, ARIMA, damped trend)",
  "forecast": [52.3, 53.1, 54.2],
  "lower": [46.2, 45.8, 47.1],
  "upper": [58.4, 60.4, 61.3],
  "interval": "90%",
  "components": {
    "mean_last3": [51.3, 51.3, 51.3],
    "arima": [52.1, 53.8, 55.2],
    "damped_trend": [53.5, 54.7, 55.8]
  },
  "backtest_mae": {
    "mean_last3": 2.34,
    "arima": 1.89,
    "damped_trend": 2.12
  }
}
```

---

## Example: Complete Integration

### Component: Risk Prediction Form

```javascript
// src/components/predictions/RiskPredictorForm.js
'use client';

import { useState } from 'react';

export default function RiskPredictorForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.target);
      const data = {
        species: formData.get('species'),
        sample_type: formData.get('sampleType'),
        ward: formData.get('ward'),
        patient_type: formData.get('patientType'),
        age: formData.get('age') ? parseInt(formData.get('age')) : null,
        gender: formData.get('gender'),
        year: new Date().getFullYear(),
      };

      const response = await fetch('/api/ml/risk-predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      setResult(result);
    } catch (err) {
      setError(err.message);
      console.error('Risk prediction failed:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">MDR Risk Prediction</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label htmlFor="species" className="block font-semibold mb-2">
            Species *
          </label>
          <select
            id="species"
            name="species"
            required
            className="w-full border rounded p-2"
          >
            <option value="">Select...</option>
            <option value="E. coli">E. coli</option>
            <option value="K. pneumoniae">K. pneumoniae</option>
            <option value="P. aeruginosa">P. aeruginosa</option>
            <option value="A. baumannii">A. baumannii</option>
          </select>
        </div>

        <div>
          <label htmlFor="sampleType" className="block font-semibold mb-2">
            Sample Type
          </label>
          <input
            id="sampleType"
            name="sampleType"
            placeholder="e.g., Blood, Urine"
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label htmlFor="ward" className="block font-semibold mb-2">
            Ward/Location
          </label>
          <input
            id="ward"
            name="ward"
            placeholder="e.g., Medicine ICU"
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label htmlFor="patientType" className="block font-semibold mb-2">
            Patient Type
          </label>
          <select id="patientType" name="patientType" className="w-full border rounded p-2">
            <option value="">Unknown</option>
            <option value="Inpatient">Inpatient</option>
            <option value="Outpatient">Outpatient</option>
          </select>
        </div>

        <div>
          <label htmlFor="age" className="block font-semibold mb-2">
            Age
          </label>
          <input
            id="age"
            name="age"
            type="number"
            min="0"
            max="120"
            placeholder="e.g., 67"
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label htmlFor="gender" className="block font-semibold mb-2">
            Gender
          </label>
          <select id="gender" name="gender" className="w-full border rounded p-2">
            <option value="">Unknown</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white rounded p-2 font-semibold disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Get Risk Prediction'}
        </button>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 p-4 rounded mb-4">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {result && (
        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <h3 className="font-bold text-lg mb-2">Result</h3>
          <p className="text-2xl font-bold text-blue-600">
            {(result.mdr_probability * 100).toFixed(1)}%
          </p>
          <p className="text-gray-600 mb-3">{result.interpretation}</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-semibold">Risk Band:</span> {result.risk_band}
            </div>
            <div>
              <span className="font-semibold">Threshold:</span> {(result.threshold * 100).toFixed(1)}%
            </div>
            <div>
              <span className="font-semibold">Typical:</span> {(result.typical_for_species * 100).toFixed(1)}%
            </div>
            <div>
              <span className="font-semibold">Source:</span> {result.history_source}
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 italic">{result.disclaimer}</p>
        </div>
      )}
    </div>
  );
}
```

---

## Error Handling

### Common Errors

| Status | Issue | Solution |
|--------|-------|----------|
| 400 | Invalid request | Check request body against schema |
| 401 | Unauthorized | Verify API key in Vercel env vars |
| 422 | Validation error | Check field types and required fields |
| 500 | Server error | Check Vercel function logs |

### Example Error Response

```json
{
  "error": "Risk prediction failed",
  "details": "Missing required field: species"
}
```

### Debugging

```javascript
// Enable detailed logging
async function debugMlCall(endpoint, body) {
  console.log('Request to:', endpoint);
  console.log('Body:', body);

  try {
    const response = await fetch(`/api/ml${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Response data:', data);

    return data;
  } catch (error) {
    console.error('Network error:', error);
  }
}
```

---

## Testing

### Local Testing

```bash
# Start the website
npm run dev

# Test an endpoint
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "species": "K. pneumoniae",
    "ward": "Medicine ICU",
    "patient_type": "Inpatient",
    "age": 67,
    "gender": "Male"
  }' \
  http://localhost:3000/api/ml/risk-predict
```

### Production Testing (Vercel)

```bash
# Get model info
curl https://your-app.vercel.app/api/ml/model-info

# Risk prediction
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"species": "K. pneumoniae"}' \
  https://your-app.vercel.app/api/ml/risk-predict
```

---

## Security Best Practices

✅ **DO:**
- Keep API key in server-side env vars only
- Use Vercel's environment variable protection
- Rotate API keys periodically
- Monitor ML API usage
- Log errors without exposing secrets

❌ **DON'T:**
- Commit API keys to git
- Use NEXT_PUBLIC_ for API key
- Log the full API key
- Expose error details to users
- Call ML API directly from browser

---

## Performance Considerations

### Caching

Cache model info (changes rarely):
```javascript
const modelInfo = await Promise.resolve(cachedModelInfo || await fetch('/api/ml/model-info'));
```

### Rate Limiting

The ML API enforces rate limits. Consider:
- Caching predictions
- Batching requests
- Implementing client-side debouncing

### Timeouts

Add timeout for slow requests:
```javascript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds

try {
  const response = await fetch('/api/ml/risk-predict', {
    signal: controller.signal,
    // ... other options
  });
} finally {
  clearTimeout(timeoutId);
}
```

---

## Support

- **ML API Docs:** https://pathowatch-ml-api.onrender.com/docs
- **ML API Status:** https://pathowatch-ml-api.onrender.com/health
- **GitHub:** https://github.com/Anshuman776/pathowatch-ml-api
