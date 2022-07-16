import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import CreatePin from '../../components/CreatePin/CreatePin';
import Feed from '../../components/Feed/Feed';
import PinDetail from '../../components/PinDetail/PinDetail';
import Search from '../../components/Search/Search';
import Navbar from '../../components/Navbar/Navbar';
import styles from './Pins.module.css';


export default function Pins ({ user }) {

  const [searchTerm, setSearchTerm] = useState("")








  return (
    <div className={styles.container}>
      <div>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user} />
      </div>

      <div>
        <Routes>
          <Route path='/' element={<Feed />} />
          <Route path='/category/:categoryId' element={<Feed />} />
          <Route path='/pin-detail/:pinId' element={<PinDetail user={user} />} />
          <Route path='/create-pin' element={<CreatePin user={user} />} />
          <Route path='/search' element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
        </Routes>
      </div>



    </div>
  )
}

