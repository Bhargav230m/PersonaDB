import fs from "fs";
import { searchWithQuery } from "./searchWithQuery.js";

/**
 * Deletes files based on a search query.
 * @param {string} search_query - The search query to find the files to delete.
 * @param {string} json_class - The JSON class to search within.
 * @param {string} name - The name to search for.
 * @param {boolean} all - Indicates whether to delete all matching files or just the first one found.
 * @throws {Error} If an error occurs during file deletion.
 */
export async function schemaDelete(search_query, json_class, name, all) {
  /**
   * @typedef {Object} json_class
   * @property {string} save_folder - The directory where the JSON files are stored.
   * @property {Function} getRandomString - A function to generate a random string.
   */

  try {
    // Search for files based on the provided query, class, and name.
    const data = await searchWithQuery(search_query, json_class, name);
    const path = data.pathArray;

    if(!path.length) {
      throw new Error("No present Data found with the given query")
    }

    // Delete files based on the specified criteria.
    if (all) {
      // Delete all matching files.
      path.forEach((path) => {
        fs.unlink(path, (err) => {
          if (err) throw err; // Throw an error if deletion fails.
        });
      });
    } else {
      // Delete only the first matching file.
      const firstPath = path[0];
      fs.unlink(firstPath, (err) => {
        if (err) throw err; // Throw an error if deletion fails.
      });
    }
  } catch (error) {
    // Rethrow any caught errors.
    throw new Error(error);
  }
}