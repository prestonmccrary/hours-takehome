import {FiCopy} from 'react-icons/fi'
import {motion} from 'framer-motion'
import ReactTooltip from "react-tooltip";

const ClipboardButton = ({textToCopy, toast, }) => {

    const copy = () => {
        navigator.clipboard.writeText(textToCopy)
        toast.addToast('Session link copied to clipboard!', {apearance: 'info'})
    }

    return(
        <>

        <motion.div>
            <FiCopy data-tip data-for="registerTip" style={{fontSize:'20px'}}  onClick={copy}/>
            <ReactTooltip id="registerTip" place="left" effect="solid" delayShow={100} >
                Copy link
            </ReactTooltip>
        </motion.div>
        </>

    )
}

export default ClipboardButton