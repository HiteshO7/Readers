import style from "./style.module.scss";
import Image from 'next/image';

const Header = () => {
    return (
        <header className={style.header}>
            <nav className={style.navbar}>
                <div className={style.codeby}>
                    Hitesh Thakur
                </div>
                <div className={style.title}>
                    Readers
                </div>
                <div className={style.menu}>
                    <Image
                        src="/menu-hamburger.png"
                        alt="Menu"
                        width={30}
                        height={30}
                        layout="intrinsic"
                    />
                </div>
            </nav>
        </header>
    );
};

export default Header;
