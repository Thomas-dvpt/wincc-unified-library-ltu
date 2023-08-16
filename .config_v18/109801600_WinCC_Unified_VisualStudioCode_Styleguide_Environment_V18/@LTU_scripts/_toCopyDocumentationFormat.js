isRGBFormat(colorString)

// Usage examples
// Exemples d'utilisation
const color_0 = "85, 88, 90";     // Valid color, expect true
const color_1 = "24; 49, 36";     // Incorrect format, expect false
const color_2 = "abc, 49, 36";    // Incorrect format, expect false
const color_3 = "300, 200, 100";  // Invalid color, expect false
const color_4 = "255, 255, 255";  // Valid color, expect true

// Trace the results of the function for each color
// Affiche les résultats de la fonction pour chaque couleur
HMIRuntime.Trace(`color_0 = ${isRGBFormat(color_0)}`); // true
HMIRuntime.Trace(`color_1 = ${isRGBFormat(color_1)}`); // false
HMIRuntime.Trace(`color_2 = ${isRGBFormat(color_2)}`); // false
HMIRuntime.Trace(`color_3 = ${isRGBFormat(color_3)}`); // false
HMIRuntime.Trace(`color_4 = ${isRGBFormat(color_4)}`); // true