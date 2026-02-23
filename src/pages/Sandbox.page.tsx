import { Navbar } from '../components/Navbar';
import { useTheme } from '../hooks/useTheme';

export const Sandbox = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Navbar
        title="ODS Sandbox"
        theme={theme}
        onThemeChange={setTheme}
      />

      <main>


      </main>
    </>
  );
};

