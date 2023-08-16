function waitForUiElement(elementPath, timeout) {
/**
* Suivi des modifications :
*
* Version   | Date      | Société            | Auteur                               | Modification(s)
* 01.00.00  | 04/2023   | AgroMousquetaires  | Thomas Heurtault                     | Version initiale
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
 
// Utilisation d'une constante pour l'intervalle de vérification
// Using a constant for the checking interval
const CHECK_INTERVAL = 100;

// Vérification du délai et affectation par défaut si nécessaire
// Checking the timeout and assigning a default value if necessary
timeout = typeof timeout !== 'number' || isNaN(timeout) || timeout <= 0 ? 10000 : timeout;

// Création d'une promesse pour l'attente de l'élément UI
// Creating a promise for waiting for the UI elemen
return new Promise((resolve, reject) => {
  const startTime = Date.now();

  // Définition de l'intervalle de vérification avec une fonction de rappel
  // Setting the checking interval with a callback function
  const intervalId =  HMIRuntime.Timers.SetInterval(() => {
    const item = UI.ActiveScreen.FindItem(elementPath);
    
    // Résoudre la promesse si l'élément est trouvé
    // Resolve the promise if the element is found
    if (item) {
      HMIRuntime.Timers.ClearInterval(intervalId);
      resolve(item);

    // Rejeter la promesse si le délai est dépassé
    // Reject the promise if the timeout is exceeded
    } else if (Date.now() - startTime > timeout) {
      HMIRuntime.Timers.ClearInterval(intervalId);
      reject(new Error(`L'élément '${elementPath}' n'a pas été trouvé dans le délai imparti (${timeout}ms)`));
    }
  }, CHECK_INTERVAL); // Vérifie toutes les 100 millisecondes 
});
}

// Usage Examples
// Exemples d'utilisation

// Example 1: Waiting for an element that is found quickly
// Exemple 1: Attente d'un élément qui est trouvé rapidement
waitForUiElement('T_Font_Title', 5000)
  .then((element) => {
    HMIRuntime.Trace("Exemple 1 : SUCCES - " + element.Name);
  })
  .catch((error) => {
    HMIRuntime.Trace('Exemple 1 : ERREUR - ' + error.message);
  });
// Example 2: Waiting for an element with the default timeout
// Exemple 2: Attente d'un élément avec le délai par défaut
waitForUiElement('T_Font_Title')
  .then((element) => {
    HMIRuntime.Trace("Exemple 2 : SUCCES - " + element.Name);
  })
  .catch((error) => {
    HMIRuntime.Trace('Exemple 2 : ERREUR - ' + error.message);
  });
// Example 3: Waiting for an element that doesn't exist (will exceed the timeout)
// Exemple 3: Attente d'un élément qui n'existe pas (va dépasser le délai)
waitForUiElement('element.nonexistent', 2000)
  .then((element) => {
    HMIRuntime.Trace("Exemple 3 : SUCCES - " + element.Name);
  })
  .catch((error) => {
    HMIRuntime.Trace('Exemple 3 : ERREUR - ' + error.message);
  });
// Example 4: Waiting for an element with a custom timeout
// Exemple 4: Attente d'un élément avec un délai personnalisé
waitForUiElement('T_Font_Title', 15000)
  .then((element) => {
    HMIRuntime.Trace("Exemple 4 : SUCCES - " + element.Name);
  })
  .catch((error) => {
    HMIRuntime.Trace('Exemple 5 : ERREUR - ' + error.message);
  });