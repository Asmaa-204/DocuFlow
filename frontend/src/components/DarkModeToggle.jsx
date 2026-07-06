import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDarkMode } from "@context/DarkModeContext";
import ButtonIcon from "@components/ButtonIcon";

function DarkModeToggle() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    return (
        <ButtonIcon onClick={toggleDarkMode} aria-label="Toggle dark mode">
            {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
        </ButtonIcon>
    );
}

export default DarkModeToggle;
