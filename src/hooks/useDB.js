import * as SQLite from 'expo-sqlite';

// Se crea un hook para la base de datos local de la aplicación.

// Se crean funciones para abrir la base de datos, insertar datos, obtener datos y cerrar la base de datos.
export const useDB = () => {
   const openDatabase = async () => {
     const db = await SQLite.openDatabaseSync("sessions.db");
     // Crear la tabla inmediatamente después de abrir la base de datos
     await db.execAsync(
       'CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL);'
     );
     return db;
   };

   const insertSession = async ({ email, localId, token }) => {
     try {
       const db = await openDatabase();
       return await db.runAsync(
         'INSERT OR REPLACE INTO sessions (localId, email, token) VALUES (?, ?, ?);',
         [localId, email, token]
       );
     } catch (error) {
       console.error('Error en insertSession:', error);
       throw error;
     }
   };

    const getSession = async () => {
      try {
        const db = await openDatabase();
        return await db.getFirstAsync('SELECT * FROM sessions');
      } catch (error) {
        console.error('Error en getSession:', error);
        return null;
      }
    };

    const closeSession = async () => {
      try {
        const db = await openDatabase();
        await db.execAsync('DELETE FROM sessions');
      } catch (error) {
        console.error('Error al cerrar la sesión:', error);
        throw error;
      }
    };

    return {
      insertSession,
      getSession,
      closeSession,
    };
};