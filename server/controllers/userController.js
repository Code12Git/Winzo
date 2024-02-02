import prisma from "../db/conn.js";


// Creating Random User

export const createRandomUser = async (req, res) => {
  try {
    const usersData = req.body;

    if (!Array.isArray(usersData) || usersData.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid data format. Expecting an array of users.' });
    }

    const createdUsers = await prisma.randomUser.createMany({
      data: usersData,
    });

    res.status(201).json({ success: true, data: createdUsers });
  } catch (error) {
    console.error('Error creating random users:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};


// Getting User Data
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getAllRandomUsers = async (req, res) => {
  try {
    const allUsers = await prisma.randomUser.findMany();
    
    // Shuffle the array of users
    const shuffledUsers = shuffleArray(allUsers);

    res.status(200).json({ success: true, data: shuffledUsers });
  } catch (error) {
    console.error('Error getting all random users:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export const deleteAllRandomUsers = async (req, res) => {
  try {
    // Assuming you are using Prisma for database operations
    const deletedUsers = await prisma.randomUser.deleteMany();

    res.status(200).json({ success: true, message: 'All random users deleted successfully.' });
  } catch (error) {
    console.error('Error deleting all random users:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
