// // hooks/useSearchFilter.js
// import { useState, useMemo } from "react";

// /**
//  * Custom hook to filter items based on search term and fields
//  * @param {Array} items - Array of objects to filter
//  * @param {Array} fields - Array of field names to search in (supports nested fields using dot notation)
//  * @returns {Object} { searchTerm, setSearchTerm, filteredItems }
//  */
// export const useSearchFilter = (items, fields) => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredItems = useMemo(() => {
//     const term = searchTerm.trim().toLowerCase();
//     if (!term) return items;

//     return items.filter((item) => {
//       return fields.some((field) => {
//         // support dot notation like 'user.name'
//         const value = field.split(".").reduce((obj, key) => obj?.[key], item);
//         if (!value) return false;
//         return value.toString().toLowerCase().includes(term);
//       });
//     });
//   }, [items, fields, searchTerm]);

//   return { searchTerm, setSearchTerm, filteredItems };
// };


// hooks/useSearchFilter.js
import { useState, useMemo } from "react";

/**
 * Custom hook to filter items based on search term and fields
 * @param {Array} items - Array of objects to filter
 * @param {Array} fields - Array of field names to search in (supports nested fields using dot notation)
 * @param {Array} computedFields - Array of functions returning string values to include in search
 * @returns {Object} { searchTerm, setSearchTerm, filteredItems }
 */
export const useSearchFilter = (items, fields, computedFields = []) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return items;

    return items.filter((item) => {
      // Check normal fields
      const matchField = fields.some((field) => {
        const value = field.split(".").reduce((obj, key) => obj?.[key], item);
        return value?.toString().toLowerCase().includes(term);
      });

      // Check computed fields
      const matchComputed = computedFields.some((fn) => {
        const value = fn(item);
        return value?.toString().toLowerCase().includes(term);
      });

      return matchField || matchComputed;
    });
  }, [items, fields, computedFields, searchTerm]);

  return { searchTerm, setSearchTerm, filteredItems };
};
