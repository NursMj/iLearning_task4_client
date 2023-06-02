import { Button } from "react-bootstrap"
import LockIcon from '@mui/icons-material/Lock'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import DeleteIcon from '@mui/icons-material/Delete'


function Toolbar({handleBlockAndUnblock, handleDelete}: any) {
  return (
    <div className="toolbar mb-3">
        <Button 
          className="me-3" 
          variant="danger" 
          onClick={()=> handleBlockAndUnblock('blocked')}
        >
          Block <LockIcon/>
        </Button>
        <Button 
          className="me-3" 
          variant="success" 
          onClick={()=> handleBlockAndUnblock('unblocked')}
        >
          Unblock <LockOpenIcon/>
        </Button>
        <Button 
          className="me-3" 
          variant="dark"
          onClick={handleDelete}
        >
          Delete <DeleteIcon/>
        </Button>
    </div>
  )
}

export default Toolbar