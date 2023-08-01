export function waitForUiElement(elementPath, timeout) {
    /**
   * Suivi des modifications :
   *
   * Version   | Date      | Société            | Auteur                               | Modification(s)
   * 01.00.00  | 04/2023   | AgroMousquetaires  | thomas.heurtault@mousquetaires.com   | Version initiale
   *
   * Description de la fonction :
   * Cette fonction attend qu'un élément d'interface utilisateur (UI) soit disponible sur l'écran actif
   * en fonction du chemin de l'élément spécifié (elementPath). La fonction vérifie périodiquement
   * l'existence de l'élément jusqu'à ce qu'il soit trouvé ou que le délai d'attente (timeout) soit dépassé.
   * 
   * @param {string} elementPath - Le chemin de l'élément UI à rechercher sur l'écran actif
   * @param {number} [timeout=10000] - Le délai d'attente maximal en millisecondes (par défaut : 10000 ms)
   * @returns {Promise<Object>} - Retourne une promesse qui résout l'élément trouvé ou rejette une erreur si le délai est dépassé
   * @throws {Error} - Erreur qui peut être levée en cas de problème lors de l'exécution de la fonction
    */
     
   timeout = typeof timeout !== 'number' || isNaN(timeout) || timeout <= 0 ? 10000 : timeout;
   
   return new Promise((resolve, reject) => {
     const startTime = Date.now();
     const intervalId =  HMIRuntime.Timers.SetInterval(() => {
       const item = UI.ActiveScreen.FindItem(elementPath);
   
       if (item) {
         HMIRuntime.Timers.ClearInterval(intervalId);
         resolve(item);
       } else if (Date.now() - startTime > timeout) {
         HMIRuntime.Timers.ClearInterval(intervalId);
         reject(new Error(`L'élément '${elementPath}' n'a pas été trouvé dans le délai imparti (${timeout}ms)`));
       }
     }, 100); // Vérifie toutes les 100 millisecondes 
   });
   }