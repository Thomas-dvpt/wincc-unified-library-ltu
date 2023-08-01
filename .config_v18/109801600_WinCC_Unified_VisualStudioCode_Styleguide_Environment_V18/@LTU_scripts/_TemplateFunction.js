export function _TemplateFunction(param1, param2) {
    /**
    * Suivi des modifications :
    *
    * Version   | Date      | Société            | Auteur                               | Modification(s)
    * 01.00.00  | 04/2023   | AgroMousquetaires  | thomas.heurtault@mousquetaires.com   | Version initiale
    *
    * Description de la fonction :
    * Cette fonction réalise une opération spécifique avec les paramètres d'entrée fournis.
    *
    * @param {string} param1 - Description du premier paramètre d'entrée
    * @param {number} param2 - Description du deuxième paramètre d'entrée
    * @returns {any} - Description de la valeur ou des valeurs renvoyées
    * @throws {Error} - Description de l'erreur qui peut être levée
    */
    
    try {
      // Validation des paramètres d'entrée
      if (typeof param1 !== 'string' || typeof param2 !== 'number') {
        throw new Error('Paramètres d\'entrée invalides');
      }
    
      //TODO :  Écrire le code ici
      const resultat = `Traitement : ${param1}, ${param2}`; // Remplacez par votre résultat réel
    
      // Trace de DEBUG 
      logTrace(_TemplateFunction.name, 'debug', `Mon message ici`);
    
      // Tracer l'exécution de la fonction
      const messageLog = `Mon message ici`;
      logTrace(_TemplateFunction.name, 'success', messageLog);
      
      // Renvoie du résultat si nécessaire
      return resultat;
    } catch (error) {
      // Tracer une erreur dans la fonction
      const messageLog = `${error}`;
      logTrace(_TemplateFunction.name, 'error', messageLog);
    
      // Lève l'erreur à la fonction appelante si nécessaire
      throw error;
    }
    }