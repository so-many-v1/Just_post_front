import styles from "./modals.module.scss"

import {useRef} from "react";

const DeletePostModal = (props) => {

    const modalRef = useRef(null)

    return (
        <div className={`${styles.modal} modal`} ref={modalRef}>
            <div className={styles.wrapper}>
                <p className={styles.wrapper__msg}>Do you really want to delete this post?</p>
                <div className={styles.wrapper__buttons}>
                    <button onClick={props.onConfirm}>Yes!</button>
                    <button onClick={props.onCancel}>No.</button>
                </div>
            </div>
        </div>
    )
}

export default DeletePostModal