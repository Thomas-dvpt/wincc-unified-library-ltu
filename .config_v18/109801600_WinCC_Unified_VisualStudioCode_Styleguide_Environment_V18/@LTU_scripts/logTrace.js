function logTrace(functionName, type, message) {
    /**
    * Suivi des modifications :
    *
    * Version   | Date      | Société            | Auteur                               | Modification(s)
    * 01.00.00  | 04/2023   | AgroMousquetaires  | Thomas Heurtault                     | Version initiale
    *
    * Description de la fonction :
    * Fonction pour enregistrer des messages de trace avec des paramètres d'entrée spécifiques.
    *
    * @param {string} functionName - Le nom de la fonction en cours de journalisation
    * @param {string} type - Le type de message de journalisation (par exemple, 'success', 'error', 'debug')
    * @param {string} message - Le message de journalisation
    * @throws {Error} - Si les paramètres d'entrée ne sont pas valides
    */
    try {
        // Validate input parameters
        // Valider les paramètres d'entrée
        if (typeof functionName !== 'string' || typeof type !== 'string' || typeof message !== 'string') {
            throw new Error('Paramètres d\'entrée invalides');
        }
    
        // Get HMI Tags
        // Obtenir les Tags HMI
        const logToVsCode = Tags("RuntimeSettings.logToVsCode").Read();
        const logToUnified = Tags("RuntimeSettings.logToUnified").Read();
        const logDebug = Tags("RuntimeSettings.logDebug").Read();
      
        // Get current date and time
        // Obtenir la date et l'heure actuelles
        const date = new Date().toLocaleString();
    
        // Helper function for logging messages
        // Fonction d'aide pour enregistrer des messages
        const logMessage = (logger, logType, logFunctionName, logMessage) => {
        eval(logger)(`${date} - ${logType} - ${logFunctionName}() - ${logMessage}`);
      };
    
        // Log to VSCode console if enabled
        // Enregistrer dans la console VSCode si activé
        if (logToVsCode) {
           switch (type) {
                case 'success':
                    logMessage(console.log, 'SUCCES', functionName, message);
                    break;
                case 'error':
                    logMessage(console.error, 'ERREUR', functionName, message);
                    break;
                case 'warning':
                    logMessage(console.warn, 'AVERTISSEMENT', functionName, message);
                    break;
                case 'debug':
                    if (logDebug) {
                    logMessage(console.log, 'DEBUG', functionName, message);
                    }
                    break;
                default:
                    break;
                }
        }
        
        // Log to WinCC Unified console
        // Enregistrer dans la console WinCC Unified
        if (logToUnified) {
           switch (type) {
                case 'success':
                    logMessage('HMIRuntime.Trace', 'SUCCES', functionName, message);
                    break;
                case 'error':
                    logMessage('HMIRuntime.Trace', 'ERREUR', functionName, message);
                    break;
                case 'warning':
                    logMessage('HMIRuntime.Trace', 'AVERTISSEMENT', functionName, message);
                    break;
                case 'debug':
                    if (logDebug) {
                    logMessage('HMIRuntime.Trace', 'DEBUG', functionName, message);
                    }
                    break;
                default:
                    break;
                }
        }
    } catch (error) {
            // Log the error within the function
            // Enregistrer l'erreur dans la fonction
            console.error(` - ERROR - ${logTrace.name}() - ${error.message}`);
            // Rethrow the error to the calling function if necessary
            // Relancer l'erreur vers la fonction appelante si nécessaire
            throw error;
            }
    }
    
    // Usage examples
    // Exemples d'utilisation
    logTrace('myFunction', 'success', 'Opération réussie');             // Example of success
    logTrace('myFunction', 'error', 'Erreur lors du traitement');       // Example of error
    logTrace('myFunction', 'warning', 'Attention, données manquantes'); // Example of warning
    logTrace('myFunction', 'debug', 'Valeur de variable : ');           // Example of debugging
    logTrace(42, 'info', 'Ceci est une info');                          // Will throw a TypeError
    
    
    
