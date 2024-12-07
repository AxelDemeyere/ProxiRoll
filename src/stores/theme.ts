import { ref } from 'vue';

const isDark = ref(false);

export const useThemeStore = () => {
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    document.documentElement.classList.toggle('dark', isDark.value);
  };

  return {
    isDark,
    toggleTheme
  };
};