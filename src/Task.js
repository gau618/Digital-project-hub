import { ref, get, remove } from "firebase/database";
import { database } from "./firebase";

const getAllUsers = async () => {
  const userRef = ref(database, "/UserData");
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    return snapshot.val();
  } else {
    return {};
  }
};

const deleteUser = async (key) => {
  const userRef = ref(database, `/UserData/${key}`);
  await remove(userRef);
};

export default {
  getAllUsers,
  deleteUser,
};
