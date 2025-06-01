import Semaphore from './semaphore';

// Set this to your MySQL user's max_user_connections
// I will set it to 2 as you suggested in your prompt.
const MAX_DB_CONNECTIONS = 1;

const dbSemaphore = new Semaphore(MAX_DB_CONNECTIONS);

export default dbSemaphore;