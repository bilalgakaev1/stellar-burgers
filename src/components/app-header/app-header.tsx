import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectUser } from '../../services/slices/userSlice';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import styles from '../ui/app-header/app-header.module.css';

export const AppHeader: FC = () => {
  const user = useSelector(selectUser);

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to='/'
            end
            className={({ isActive }) =>
              `${styles.link} text text_type_main-default` +
              (isActive ? ` ${styles.link_active}` : '')
            }
          >
            {({ isActive }) => (
              <>
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <span className='ml-2 mr-10'>Конструктор</span>
              </>
            )}
          </NavLink>
          <NavLink
            to='/feed'
            className={({ isActive }) =>
              `${styles.link} text text_type_main-default` +
              (isActive ? ` ${styles.link_active}` : '')
            }
          >
            {({ isActive }) => (
              <>
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <span className='ml-2'>Лента заказов</span>
              </>
            )}
          </NavLink>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <NavLink
          to='/profile'
          className={({ isActive }) =>
            `${styles.link} ${styles.link_position_last} text text_type_main-default` +
            (isActive ? ` ${styles.link_active}` : '')
          }
        >
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <span className='ml-2'>{user?.name || 'Личный кабинет'}</span>
            </>
          )}
        </NavLink>
      </nav>
    </header>
  );
};
