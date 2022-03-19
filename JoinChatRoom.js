import '../assets/JoinChatRoom.css';
import { useRef } from 'react';
import { useState } from 'react';
import mockBackEnd from '../assets/mockBackEndRoomList.json'

function JoinChatRoom() {
  //take record of the state of the meeting
  const state = useRef(0);
  //take record of the meetingID
  const meetingID = useRef('');
  //registration, set username
  const [name, setName] = useState('');
  //checking errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  
  function registerNewRoomButton(){
    const userInput = document.getElementById('register').value;
    if (localStorage.getItem(userInput)) {
      state.current=0;
    } else {
      console.log('newMeeting');
      localStorage.setItem(userInput, JSON.stringify([0, 0]));
      state.current=1;
      meetingID.current = userInput;
    }
  }
  function JoinMeetingButton(){
    const userInput = document.getElementById('register').value;
    if (localStorage.getItem(userInput)) {
        meetingID.current = userInput;
      localStorage.setItem(userInput, JSON.stringify([0, 0]));
      state.current=1;
    } else {
      state.current=0;
    }
  }
  //not log-in or reigstered yet
  if (state.current == 0){
     return(
      <div className="register">
        <input type="text" placeholder="Please register a meeting" id="register" />
        <button type="submit" onClick={registerNewRoomButton}>Register</button>
        <br />
        <input type="text" placeholder="Please join yout meeting" id="login" />
        <button type="submit" onClick={JoinMeetingButton}>Login</button>
        <br />
      </div>
     );
  }

  function chatroom(){
    state.current = 2;
  }

  function logout(){
    state.current = 0;
    const bestScore = (JSON.parse(localStorage.getItem(meetingID.current)))[1];
    localStorage.setItem(meetingID.current, JSON.stringify([0, bestScore]));
  }
  
  //has finished log-in, Jump to a new page ChatRoom()
  if (state == 1){
     return(
      <div className="ChatRoom">
        <input type="text" placeholder="In Chat Room" id="Chat Room ID" />
        <button type="submit" onClick={chatroom}>Start the room</button>
      </div>
     );
  }
  function homePage(){
    state.current = 1;
  }  
}
export default App;
