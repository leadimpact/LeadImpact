/**
 * Runs before first paint (inlined in <head>): marks <html data-lite> when the visitor has
 * Data Saver on or a 2G connection, so CSS can drop hero images before they are requested.
 */
export const LITE_MODE_SCRIPT = `try{var c=navigator.connection;if(c&&(c.saveData||/(^|-)2g$/.test(c.effectiveType||"")))document.documentElement.setAttribute("data-lite","")}catch(e){}`;
