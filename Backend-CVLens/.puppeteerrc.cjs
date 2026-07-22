/**
 * Puppeteer Configuration
 *
 * Sets the Chrome cache directory to be INSIDE the project directory.
 *
 * Why this matters on Render:
 * - Default cache: /opt/render/.cache/puppeteer  ← outside project, NOT carried to runtime
 * - This config:   <project>/.cache/puppeteer     ← inside project, carried to runtime ✅
 *
 * Render's build and runtime environments are separate containers.
 * Only the project directory is preserved — the system-level /opt/render/.cache/ is not.
 * Storing Chrome inside the project ensures it survives the build → runtime transition.
 */

const { join } = require("path");

module.exports = {
    cacheDirectory: join(__dirname, ".cache", "puppeteer"),
};
