import { motion } from 'framer-motion';
import './Loading.css';

const Loader: React.FC = () => {
    return (
        <motion.div
            className='loader-container'
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            exit={{ opacity: 0}}
            transition={{ duration: 1 }}
        >
            <span className="loader"></span>
        </motion.div>
    );
};

export default Loader;

