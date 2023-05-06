import app from '../config/firebase.js';
import {
    getDatabase,
    ref,
    get,
    push,
    remove,
    child,
} from 'firebase/database';

const db = getDatabase(app);
const dbRef = ref(db);

export const getData = async (userId) => {
    if (!userId) return;
    try {
        const snapshot = await get(child(dbRef, `userData/${userId}`));
        if (snapshot.exists()) {
            const { books } = snapshot.val();
            const booksMsg = Object.values(books).join('\n');
            console.log(booksMsg);
            return booksMsg;
        }
        console.log('No data available');
        return null;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const updateBookData = async (userId, books) => {
    if (!books || !userId) return;
    try {
        if (Array.isArray(books)) {
            return books.map(async (book) => {
                await push(ref(db, `userData/${userId}/books`), book);
            });
        }
        return await push(ref(db, `userData/${userId}/books`), books);
    } catch (error) {
        console.log(error);
    }
};

export const deleteData = async (userId) => {
    if (!userId) return;
    try {
        return await remove(ref(db, `userData/${userId}`));
    } catch (error) {
        console.log(error);
    }
};
