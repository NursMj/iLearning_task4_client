import { useState, useEffect } from 'react'
import { Container } from "react-bootstrap"
import UserList from "../components/UserList"
import Toolbar from "../components/Toolbar"
import UserObject from "../interfaces/UserObject"
import axios from 'axios'


function AdminPage(props: any) {
  const {logOut,isLoading, setIsLoading} = props.props
  const [userList, setUserList] = useState<UserObject[]>([])
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const url = import.meta.env.VITE_API_URL + "users/"
  const email = localStorage.getItem('email')

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
    setIsLoading(true)
    try {
      const response = await axios.post(url, {email: email})
      const data = response.data
      setUserList(data)
    } catch (err: any) {
      if (err.response && err.response.status === 403) {
        alert(err.response.data.error)
        logOut()
      } else {
        console.log(err)
      }
    }
    setIsLoading(false)
  }

  async function handleBlockAndUnblock(status: string) {
    setIsLoading(true)
    try {
      await axios.put(url + 'update-status', {
        email: email,
        userIds: selectedItems,
        status
      })
      refreshTable()
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  async function handleDelete() {
    setIsLoading(true)
    try {
      await axios.delete(url+`delete/`, {data: { userIds: selectedItems }})
      refreshTable()
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    refreshTable()
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
        isLoading={isLoading}
      />
    </Container>
  )
}

export default AdminPage