import "./Header.css";
import Menu from "../Menu/Menu";
import SearchInput from "../SearchInput/SearchInput";
import Logo from "../Logo/Logo";

export default function Header() {
    return (
        <header className="header">
            <div className="header__container">
                <Logo />
                <Menu />
                <SearchInput />
            </div>
        </header>
    );
}