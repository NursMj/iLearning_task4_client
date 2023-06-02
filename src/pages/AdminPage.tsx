import { useState, useEffect } from 'react'
import { Container } from "react-bootstrap"
import UserList from "../components/UserList"
import Toolbar from "../components/Toolbar"
import UserObject from "../interfaces/UserObject"
import axios from 'axios'


function AdminPage() {

  const [userList, setUserList] = useState<UserObject[]>([])
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const url = import.meta.env.VITE_API_URL + "users/"

  function refreshTable() {
    fetchData(url)
    setSelectedItems([])
    setSelectAll(false)
  }

  function handleSelectItem(itemId: number) {
      selectedItems.includes(itemId) ? 
      setSelectedItems((prevSelectedItems) => prevSelectedItems.filter((item) => item !== itemId))
      :
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, itemId])
  }

  function handleSelectAll() {
      if (selectAll) {
        setSelectedItems([]);
      } else {
        const allItemIds = userList.map((item: UserObject) => item.id);
        setSelectedItems(allItemIds);
      }
    
      setSelectAll((prevSelectAll) => !prevSelectAll);
  }

  async function fetchData(url: string) {
    try {
      const response = await axios.get(url)
      const data = response.data
      setUserList(data)
    } catch (err) {
      console.log(err)
    }
  }

  async function handleBlockAndUnblock(status: string) {
    try {
      await axios.put(url + 'update-status', {
        userIds: selectedItems,
        status
      })
      refreshTable()
    } catch (error) {
      console.error(error)
    }
  }

  async function handleDelete() {
    try {
      await axios.delete(url+`delete/`, {data: { userIds: selectedItems }})
      refreshTable()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData(url)
  }, [])

  return (
    <Container className="mt-5">
      <Toolbar 
        handleBlockAndUnblock={handleBlockAndUnblock}
        handleDelete={handleDelete}
      />
      <UserList 
        data={userList} 
        handleSelectAll={handleSelectAll}
        handleSelectItem={handleSelectItem}
        selectAll={selectAll}
        selectedItems={selectedItems}
      />
    </Container>
  )
}

export default AdminPage