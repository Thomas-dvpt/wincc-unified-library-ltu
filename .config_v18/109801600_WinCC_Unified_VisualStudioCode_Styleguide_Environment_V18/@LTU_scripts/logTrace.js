export function logTrace(functionName, type, message) {
    /**
    * Suivi des modifications :
    *
    * Version   | Date      | Société            | Auteur                               | Modification(s)
    * 01.00.00  | 04/2023   | AgroMousquetaires  | thomas.heurtault@mousquetaires.com   | Version initiale
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
        // Valider les paramètres d'entrée
        if (typeof functionName !== 'string' || typeof type !== 'string' || typeof message !== 'string') {
            throw new Error('Paramètres d\'entrée invalides');
        }
    
        // Obtenir les Tags HMI 
        const logToVsCode = Tags("RuntimeSettings.logToVsCode").Read();
        const logToUnified = Tags("RuntimeSettings.logToUnified").Read();
        const logDebug = Tags("RuntimeSettings.logDebug").Read();
      
        // Obtenir la date et l'heure actuelles
        const date = new Date().toLocaleString();
    
        // Fonction d'aide pour enregistrer des messages
        const logMessage = (logger, logType, logFunctionName, logMessage) => {
        eval(logger)(`${date} - ${logType} - ${logFunctionName}() - ${logMessage}`);
      };
    
        // Enregistre dans la console VSCode si activé
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
    } catch (error) {
            // Enregistre l'erreur dans la fonction
            console.error(` - ERROR - ${logTrace.name}() - ${error}`);
            // Lève l'erreur à la fonction appelante si nécessaire
            throw error;
            }
    }