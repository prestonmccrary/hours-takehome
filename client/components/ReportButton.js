import {FiAlertCircle} from 'react-icons/fi'
import {motion} from 'framer-motion'
import ReactTooltip from "react-tooltip";

const ReportButton = ({chatService, toast}) => {

    return(
        <>

        <motion.div whileHover={{y: 2}}>
            <FiAlertCircle data-tip data-for="registerTip" style={{fontSize:'20px', color:"red", marginLeft: '25px'}}  onClick={() => {
                chatService.report()
                toast.addToast('Session has been reported!', {apearance: 'error'})

            }}/>
        </motion.div>
        </>

    )
}

export default ReportButton