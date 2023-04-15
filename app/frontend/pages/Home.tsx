import { useEffect, useState } from 'react'
import { apiChat } from '../api';

function Home() {

  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const handleUserOptionChange = (value) => {
    setSelectedUser(value);
    setIsDisabled(!selectedUser || !selectedRoom);
  };

  const handleRoomOptionChange = (value) => {
    setSelectedRoom(value);
    setIsDisabled(!selectedUser || !selectedRoom);
  };

  useEffect(() => {
    const fetch = async () => {
      let data = await apiChat.getUsersRooms()
      setUsers(data.users)
      setRooms(data.rooms)
    }
    fetch().catch(console.error)
  }, [])

  return (
    <div className="App flex flex-col">
      <div className='form-control'>
        <div className='flex flex-row items-center my-2'>
          <input
            id="user-input"
            type="text"
            value={selectedUser}
            placeholder='Any User'
            onChange={(e) => handleUserOptionChange(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1">Type or Choose</label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              {users.map((option) => (
                <li key={option} onClick={() => handleUserOptionChange(option)}><a >{option}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className='flex flex-row items-center my-2'>
          <input
            id="room-input"
            type="text"
            value={selectedRoom}
            placeholder='Any Room'
            onChange={(e) => handleRoomOptionChange(e.target.value)}
            className="input input-bordered w-full max-w-xs"
          />
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1">Type or Choose</label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              {rooms.map((option) => (
                <li key={option} onClick={() => handleRoomOptionChange(option)}><a>{option}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <button className='btn btn-primary mt-8' disabled={isDisabled}>Start Chatting</button>
    </div>
  )
}

export default Home;
