export const getRandomInRange = (min, max) => Math.random() * (max - min) + min;
export const getRandomBool = (probability = 0.5) => Math.random() < probability;
export const getRandomItem = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];
export const getChaosProbability = (baseProb, chaosLevel) =>
  Math.min(baseProb * (chaosLevel / 5), 1);

/**
 * Cross-browser compatible deep clone function.
 * Uses structuredClone if available, falls back to JSON serialization.
 */
export const deepClone = (obj) => {
  if (typeof structuredClone === "function") {
    return structuredClone(obj);
  }
  // Fallback for older browsers
  return JSON.parse(JSON.stringify(obj));
};

/** Copies text to the user's clipboard. */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers or insecure contexts
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const success = document.execCommand("copy");
      document.body.removeChild(textArea);
      return success;
    } catch (execErr) {
      document.body.removeChild(textArea);
      throw new Error("Failed to copy to clipboard");
    }
  }
};

/**
 * Validates a particle configuration object to prevent XSS and malformed data.
 * @param {any} config - The configuration to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidConfig = (config) => {
  if (!config || typeof config !== "object") {
    return false;
  }

  // Check for required structure
  if (!config.particles || typeof config.particles !== "object") {
    return false;
  }

  // Validate chaos level if present in uiState
  if (config.uiState) {
    const { chaosLevel } = config.uiState;
    if (chaosLevel !== undefined && (
      typeof chaosLevel !== "number" ||
      chaosLevel < 1 ||
      chaosLevel > 10 ||
      !Number.isInteger(chaosLevel)
    )) {
      return false;
    }
  }

  // Sanitize string values to prevent XSS
  const sanitizeValue = (val) => {
    if (typeof val === "string") {
      // Reject strings containing script tags or javascript: protocol
      if (/<script|javascript:|onerror|onclick/i.test(val)) {
        return false;
      }
    }
    return true;
  };

  // Recursively check all string values
  const checkObject = (obj, depth = 0) => {
    // Prevent deeply nested objects (DoS protection)
    if (depth > 20) {
      return false;
    }

    for (const key in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
      const val = obj[key];

      if (!sanitizeValue(val)) {
        return false;
      }

      if (typeof val === "object" && val !== null) {
        if (Array.isArray(val)) {
          for (const item of val) {
            if (typeof item === "object" && item !== null) {
              if (!checkObject(item, depth + 1)) return false;
            } else if (!sanitizeValue(item)) {
              return false;
            }
          }
        } else {
          if (!checkObject(val, depth + 1)) {
            return false;
          }
        }
      }
    }
    return true;
  };

  return checkObject(config);
};
