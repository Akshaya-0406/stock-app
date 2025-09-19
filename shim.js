// shim.js
import { Platform } from "react-native";

let AsyncStorage;

if (Platform.OS === "web") {
  AsyncStorage = {
    getItem: async (key) => Promise.resolve(localStorage.getItem(key)),
    setItem: async (key, value) => Promise.resolve(localStorage.setItem(key, value)),
    removeItem: async (key) => Promise.resolve(localStorage.removeItem(key)),
    clear: async () => Promise.resolve(localStorage.clear()),
  };
} else {
  try {
    AsyncStorage = require("@react-native-async-storage/async-storage").default;
  } catch (e) {
    // fallback: simple in-memory (non-persistent) storage
    console.warn("AsyncStorage not installed — using in-memory fallback.");
    const mem = {};
    AsyncStorage = {
      getItem: async (k) => Promise.resolve(mem[k] ?? null),
      setItem: async (k, v) => Promise.resolve((mem[k] = v)),
      removeItem: async (k) => Promise.resolve(delete mem[k]),
      clear: async () => Promise.resolve(Object.keys(mem).forEach((k) => delete mem[k])),
    };
  }
}

export default AsyncStorage;
