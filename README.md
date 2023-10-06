
# NoteShare - Share Your Notes!

NoteShare is a web application that allows users to share their notes with others and interact with fellow users through a built-in chat feature. With NoteShare, you can easily create, manage, and share your notes while **connecting with like-minded individuals**.

![home page](https://github.com/ankitkr437/NoteSharing/blob/main/frontend/public/image/home.png)


## Features

- **User Profiles:** Every user gets their own profile where they can view and manage their notes, as well as see their activity and engagement on the platform.
  
  ![profile page](https://github.com/ankitkr437/NoteSharing/blob/main/frontend/public/image/userprofile.png)


- **Note Sharing:** Share your notes with the community which will help others to get more on that topic.

  
- **React on Notes:** React like if you like the notes also one can add the comment over the post of note

  
- **Note Management:** Organize your notes using some description and add note titles for easy retrieval.


- **Chat with Other Users:** Engage in **real-time conversations** with other users through the built-in chat feature. Discuss topics, exchange knowledge, and build connections.
  
  ![chat page](https://github.com/ankitkr437/NoteSharing/blob/main/frontend/public/image/chat.png)


- **Privacy and Security:** NoteShare prioritizes the **security and privacy** of its users. All user data is encrypted and kept confidential.

## How to Use NoteShare

1. **Sign Up / Log In:** If you're a new user, create an account by providing your email and password. If you're an existing user, simply log in to your account.

2. **Create a Note:** To share a note, int home page click on "Upload Note." Write your note, add relevant description, titles and your url of notes where you have uploaded the note
   
  ![UploadNots](https://github.com/ankitkr437/NoteSharing/blob/main/frontend/public/image/uploadform.png)
  

4. **Explore Shared Notes:**  find notes shared by other users. You can filter notes by tags, categories, or popularity on the searchBox by typing specific text.

5. **Chat with Users:** To start a conversation, click on the "Chat" button. search for particular user and click on that user now You can have one-on-one chats.
   
   ![UploadNots](https://github.com/ankitkr437/NoteSharing/blob/main/frontend/public/image/searchuser.png)


7. **Manage Your Notes:** In your profile, you can view and manage all your notes. Edit, delete, or update.


## Technologies Used

NoteShare is built using a combination of cutting-edge technologies:

- Frontend: HTML, CSS, JavaScript, **React.js**
- Backend: **Node.js**, **Express.js**
- Database: **MongoDB**
- Real-time Communication: **WebSockets**

## Installation

To run NoteSharing locally, follow these steps:

1. Clone this repository to your local machine.
   ```bash
   git clone https://github.com/your-username/notesharing.git
   ```

2. Install the dependencies for both the frontend and backend.
   ```bash
   # Navigate to the frontend directory
   cd NoteSharing/frontend
   npm install

   # Navigate to the backend directory
   cd ../backend
   npm install

    # Navigate to the socket directory
   cd ../socket
   npm install
   ```

3. Set up your MongoDB database and update the connection string in `backend/.env`.
4. Replace BASE_URL to LocalBASE_URL in frontend/src/requestMethods.js.
5. For using the messenger, Replace EndPoint to your locally running socket url in frontend/src/pages/messenger/messenger.jsx.
6. Start the development servers for both the frontend and backend.
   ```bash
   # In the backend directory
   npm start
   # In the socket directory
   npm start
   # In the frontend directory
   npm start
   ```
7. Visit `http://localhost:3000` in your web browser to access NoteShare.

## Contribution

We welcome contributions to make NoteShare better! If you have any bug fixes, feature implementations, or suggestions, feel free to open an issue or submit a pull request.

## License

NoteShare is licensed under the [**MIT License**](https://github.com/ankitkr437/NoteSharing/blob/main/LICENSE). Feel free to use, modify, and distribute the code for personal and commercial projects.

## Contact

If you have any questions, feedback, or inquiries, please contact us at **ankitloharshi@gmail.com** or visit our [**website**](https://notesharing.onrender.com/).

Happy Note Sharing! 📝
