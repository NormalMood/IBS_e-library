import { FC } from 'react';
import styles from './CustomFileInput.module.css';
import useCoverStore from '../../../store/useCoverStore';

const CustomFileInput: FC = () => {
    const setCover = useCoverStore(state => state.setCover);
    const setPreviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (FileReader && e.target.files !== null && e.target.files[0] !== undefined) {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(e.target.files[0])
            setCover(e.target.files[0])
            fileReader.onload = (onloadEvent) => {
                const image = new Image()
                image.src = onloadEvent.target?.result as string
                image.onload = () => {
                    document.getElementById('previewImage')?.setAttribute('src', image.src)
                }
            }
        }
    }
    return (
        <label htmlFor='image' className={styles.customFileInput}>
            <div className={styles.backgroundContentContainer}>
                <span>Загрузите</span>
                <span>обложку*</span>
                <img src='/img/image_upload.png' className={styles.customFileInputImg} />
            </div>
            <img id='previewImage' className={styles.previewImage} />
            <input id='image' type='file' accept='.jpg, .png' className={styles.inputHidden} onChange={e => setPreviewImage(e)} />
        </label>
    )
}

export default CustomFileInput;