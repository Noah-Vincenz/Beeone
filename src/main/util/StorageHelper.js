import AsyncStorage from '@react-native-async-storage/async-storage';

async function set(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
};
  
async function get(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return JSON.parse(value);
    } catch (error) {
      console.error(error);
      return null;
    }
};

async function remove(key) {
    try {
        await AsyncStorage.removeItem(key);
    }
    catch(exception) {
        return false;
    }
    return true;
};
  
export function setAsyncStorage(key, value) {
    return set(key, value);
}

export function getAsyncStorage(key) {
    return get(key);
}

export function removeAsyncStorage(key) {
    return remove(key);
}
