function isRGBFormat(colorString) {
    /**
     *
     * Suivi des modifications :
     * Version   | Date      | Société            | Auteur                               | Modification(s)
     * 01.00.00  | 08/2023   | AgroMousquetaires  | Thomas Heurtault                     | Version initiale
     *
     * Description de la fonction :
     * Cette fonction vérifie si une chaîne de caractères est au format "R, G, B",
     * où R, G et B sont des nombres entiers compris entre 0 et 255. Elle effectue
     * la vérification du format et des valeurs des composants de couleur.
     *
     * @param {string} colorString - La chaîne de caractères à vérifier, au format "R, G, B"
     * @returns {boolean} - Renvoie true si la chaîne a le format attendu et les valeurs sont valides, sinon false
     */
    
      // Default Color
      // Couleur par défaut 
      const colorDefault = HMIRuntime.Math.RGB(0,0,0);
    
      // Check if the string matches the format "number,number,number"
      // Vérifie si la chaîne correspond au format "nombre,nombre,nombre"
      const colorPattern = /^\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*$/;
    
      // If the color string does not match the expected format
      // Si la chaîne de couleur ne correspond pas au format attendu
      if (!colorPattern.test(colorString)){
        logTrace("isRGBFormat" ,"error",`Le format de couleur renseignée ${colorString}  est incorrect`);
        return colorDefault;
      }
    
      try {
            // Remove unnecessary spaces and convert to numbers
            // Supprime les espaces inutiles et convertit en nombres
            const [R, G, B] = colorString.split(',').map(Number);
            logTrace("isRGBFormat","debug",`Mappage de la couleur : R=${R}, G=${G}, B=${B} `);
            // Check if the color components are within the valid range
            // Vérifie si les composants de couleur sont dans la plage valide
            if (R >= 0 && R <= 255 && G >= 0 && G <= 255 && B >= 0 && B <= 255) {
              logTrace("isRGBFormat","success",`La couleur est valide : R=${R}, G=${G}, B=${B}`);
              return HMIRuntime.Math.RGB(R,G,B);
      
            } else {
              // Log an error if the color is outside the valid range
              // Enregistre une erreur si la couleur est hors plage valide
              logTrace("isRGBFormat","error",`La couleur renseignée ${colorString} est hors plage (0 < R,G,B < 255)`);
              return colorDefault;
            }
      } catch(error) {
              logTrace("isRGBFormat", "error", `Erreur lors de la conversion de la couleur : ${error.message}`);
              return colorDefault;
      }
    }
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