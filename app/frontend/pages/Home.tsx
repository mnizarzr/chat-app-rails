import { useEffect, useState } from 'react'
import { apiChat } from '../api';
import { useNavigate } from 'react-router';

function Home() {

  const navigate = useNavigate();

  const [users, setUsers] = useState<string[]>([]);
  const [rooms, setRooms] = useState<string[]>([]);

  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState<string>("");

  const handleUserOptionChange = (value: string) => {
    setSelectedUser(value);
  };

  const handleRoomOptionChange = (value: string) => {
    setSelectedRoom(value);
  };

  const handleOnSubmit = () => {
    navigate('/conversation', { state: { user: selectedUser, room: selectedRoom } })
  }

  useEffect(() => {
    const fetch = async () => {
      let data = await apiChat.getUsersRooms()
      setUsers(data.users)
      setRooms(data.rooms)
    }
    fetch().catch(console.error)
  }, [])

  return (
    <div className="container mx-auto w-full flex justify-center items-center h-screen">
      <div id='form' className="w-96 flex flex-col">
        <div className='form-control'>
          <div className='flex flex-row justify-center items-center my-2'>
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
          <div className='flex flex-row justify-center items-center my-2'>
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
        <button className='btn btn-primary mt-8 grow' disabled={!(selectedUser.length > 0 && selectedRoom.length > 0)} onClick={handleOnSubmit}>Start Chatting</button>
      </div>
    </div>
  )
}

export default Home;
