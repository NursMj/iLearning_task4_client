import { Table } from "react-bootstrap"
import UserObject from "../interfaces/UserObject"

function UserList(props: any) {
    const data: UserObject[] = props.data
    const {selectAll, handleSelectAll, handleSelectItem, selectedItems} = props

    return (
        <Table striped bordered hover>
        <thead>
          <tr>
            <th><input 
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
            />  Select all</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Registration date</th>
            <th>Last login date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
            {data.map(u => {
                return (
                    <tr key={u.id} className={u.status == 'blocked' ? 'bg-danger': ''}>
                        <td><input 
                            type="checkbox" 
                            checked={selectedItems.includes(u.id)}
                            onChange={()=>handleSelectItem(u.id)}
                        /></td>
                        <td>{u.id}</td>
                        <td>{u.first_name}</td>
                        <td>{u.email}</td>
                        <td>{u.createdAt.slice(0, -8)}</td>
                        <td>{u.updatedAt.slice(0, -8)}</td>
                        <td>{u.status}</td>
                    </tr>
                )
            })}
        </tbody>
      </Table>
    )
}

export default UserList