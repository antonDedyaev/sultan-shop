import { FC } from 'react';
import close from '../assets/img/close-btn.svg';
import success from '../assets/img/success.svg';

export interface IModalProps {
    active: boolean;
    setActive: (state: boolean) => void;
}

const ModalOrderProcessed: FC<IModalProps> = ({ active, setActive }) => {
    return (
        <div className={active ? 'modal active' : 'modal'}>
            <div className={active ? 'modal-order-processed active' : 'modal-order-processed'}>
                <div className='btn-close' onClick={() => setActive(false)}>
                    <img src={close} alt="Крестик для закрытия" height='12' width='12' />
                </div>
                <div className='modal-content'>
                    <img src={success} alt="Галочки" />
                    <span>Спасибо за заказ</span>
                    <p>Наш менеджер свяжется с вами в ближайшее время</p>
                </div>

            </div>
        </div>
    )

};

export default ModalOrderProcessed;