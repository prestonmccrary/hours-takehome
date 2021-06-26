import {FiLink} from 'react-icons/fi'
import {motion} from 'framer-motion'
import ReactTooltip from "react-tooltip";

const ClipboardButton = ({textToCopy, toast, }) => {

    const copy = () => {
        navigator.clipboard.writeText(textToCopy)
        toast.addToast('Session link copied to clipboard!', {apearance: 'info'})
    }

    return(
        <>

        <motion.div whileHover={{y: 2}}>
            <FiLink data-tip data-for="registerTip" style={{fontSize:'20px', color:"#4299E1", marginLeft: '20px'}}  onClick={copy}/>
        </motion.div>
        </>

    )
}

export default ClipboardButton