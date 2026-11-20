/**
 * Data Normalization Utilities
 * Standardizes incoming AMR surveillance data from various sources
 */

// Pathogen name normalization mappings
const PATHOGEN_MAPPINGS = {
  'e. coli': 'Escherichia coli',
  'ecoli': 'Escherichia coli',
  'e coli': 'Escherichia coli',
  'escherichia coli': 'Escherichia coli',
  
  'k. pneumoniae': 'Klebsiella pneumoniae',
  'klebsiella': 'Klebsiella pneumoniae',
  'klebsiella pneumoniae': 'Klebsiella pneumoniae',
  
  's. aureus': 'Staphylococcus aureus',
  'staph': 'Staphylococcus aureus',
  'staphylococcus': 'Staphylococcus aureus',
  'staphylococcus aureus': 'Staphylococcus aureus',
  
  'p. aeruginosa': 'Pseudomonas aeruginosa',
  'pseudomonas': 'Pseudomonas aeruginosa',
  'pseudomonas aeruginosa': 'Pseudomonas aeruginosa',
  
  'a. baumannii': 'Acinetobacter baumannii',
  'acinetobacter': 'Acinetobacter baumannii',
  'acinetobacter baumannii': 'Acinetobacter baumannii'
};

// Susceptibility result normalization
const SUSCEPTIBILITY_MAPPINGS = {
  'r': 'Resistant',
  'resistant': 'Resistant',
  'resist': 'Resistant',
  
  's': 'Sensitive',
  'sensitive': 'Sensitive',
  'susceptible': 'Sensitive',
  
  'i': 'Intermediate',
  'intermediate': 'Intermediate',
  'int': 'Intermediate'
};

/**
 * Normalize pathogen name
 */
export function normalizePathogen(pathogen) {
  if (!pathogen) return null;
  
  const normalized = pathogen.toLowerCase().trim();
  return PATHOGEN_MAPPINGS[normalized] || pathogen.trim();
}

/**
 * Normalize susceptibility result
 */
export function normalizeSusceptibility(result) {
  if (!result) return null;
  
  const normalized = result.toLowerCase().trim();
  return SUSCEPTIBILITY_MAPPINGS[normalized] || result.trim();
}

/**
 * Normalize sample type
 */
export function normalizeSampleType(sampleType) {
  if (!sampleType) return null;
  
  // Capitalize first letter of each word
  return sampleType
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Normalize antimicrobial name
 */
export function normalizeAntimicrobial(antimicrobial) {
  if (!antimicrobial) return null;
  
  // Capitalize first letter
  return antimicrobial.charAt(0).toUpperCase() + antimicrobial.slice(1).toLowerCase().trim();
}

/**
 * Validate required fields in a record
 */
export function validateRecord(record) {
  const errors = [];
  
  if (!record.external_record_id) {
    errors.push('Missing external_record_id');
  }
  
  if (!record.report_date) {
    errors.push('Missing report_date');
  }
  
  if (!record.pathogen) {
    errors.push('Missing pathogen');
  }
  
  if (!record.sample_type) {
    errors.push('Missing sample_type');
  }
  
  if (!record.antimicrobial) {
    errors.push('Missing antimicrobial');
  }
  
  if (!record.susceptibility_result) {
    errors.push('Missing susceptibility_result');
  }
  
  // Validate date format
  if (record.report_date) {
    const date = new Date(record.report_date);
    if (isNaN(date.getTime())) {
      errors.push('Invalid report_date format');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Normalize a complete AMR record
 */
export function normalizeRecord(record) {
  return {
    externalRecordId: record.external_record_id,
    reportDate: new Date(record.report_date),
    pathogen: normalizePathogen(record.pathogen),
    sampleType: normalizeSampleType(record.sample_type),
    antimicrobial: normalizeAntimicrobial(record.antimicrobial),
    susceptibilityResult: normalizeSusceptibility(record.susceptibility_result),
    area: record.area
  };
}
