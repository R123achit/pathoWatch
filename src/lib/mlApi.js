/**
 * ML API Client
 * 
 * Server-side utility for making secure requests to the PathoWatch ML API.
 * This runs on the Vercel backend, so API keys are never exposed to the browser.
 * 
 * ML API: https://pathowatch-ml-api.onrender.com
 */

const ML_API_URL = process.env.PATHOWATCH_ML_API_URL || 'https://pathowatch-ml-api.onrender.com';
const ML_API_KEY = process.env.PATHOWATCH_ML_API_KEY;

if (!ML_API_KEY) {
  console.warn('Warning: PATHOWATCH_ML_API_KEY not set. ML API calls will fail.');
}

/**
 * Make a request to the ML API
 * @param {string} endpoint - API endpoint (e.g., '/v1/risk/predict')
 * @param {object} body - Request body
 * @returns {Promise<object>} API response
 * @throws {Error} If request fails
 */
export async function callMlApi(endpoint, body) {
  const url = `${ML_API_URL}${endpoint}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': ML_API_KEY,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage = data.detail || data.error || `API error: ${response.status}`;
    throw new Error(errorMessage);
  }

  return data;
}

/**
 * Get model information
 * @returns {Promise<object>} Model metadata
 */
export async function getModelInfo() {
  return callMlApi('/v1/model-info', {});
}

/**
 * Classify MDR status from susceptibility results
 * @param {Array} isolates - Array of isolates with pathogen and results
 * @returns {Promise<object>} Classification results
 */
export async function classifyMDR(isolates) {
  return callMlApi('/v1/mdr/classify', { isolates });
}

/**
 * Predict MDR risk before lab results
 * @param {object} data - Isolate data (species, ward, patient_type, age, gender, etc.)
 * @returns {Promise<object>} Risk prediction with probability and interpretation
 */
export async function predictRisk(data) {
  return callMlApi('/v1/risk/predict', data);
}

/**
 * Analyze surveillance data for anomalies and hotspots
 * @param {Array} areas - Array of area series data
 * @param {number} horizon - Forecast horizon (1-12 months)
 * @returns {Promise<object>} Surveillance analysis with anomalies, hotspots, forecasts
 */
export async function analyzeSurveillance(areas, horizon = 3) {
  return callMlApi('/v1/surveillance/analyze', { areas, horizon });
}

/**
 * Generate time series forecast
 * @param {Array<number>} values - Historical values (at least 3)
 * @param {number} horizon - Number of periods to forecast (1-24)
 * @param {number} upperBound - Optional upper bound for forecasts (e.g., 100 for percentages)
 * @returns {Promise<object>} Forecast with point estimates and prediction intervals
 */
export async function forecast(values, horizon = 3, upperBound = null) {
  return callMlApi('/v1/forecast', { 
    values, 
    horizon,
    upper_bound: upperBound 
  });
}
