import { useState } from 'react';
import { useGlobalStore } from '../stores/useGlobalStore';
import { IconButton, ThemePanel as RadixThemePanel } from '@radix-ui/themes';
import { MagicWandIcon } from '@radix-ui/react-icons';

export function ThemePanel() {
  const [showPanel, setShowPanel] = useState(false);
  const changeAppearance = useGlobalStore((state) => state.changeAppearance);

  return (
    <>
      <IconButton variant="ghost" onClick={() => setShowPanel((value) => !value)}>
        <MagicWandIcon />
      </IconButton>
      {showPanel && <RadixThemePanel style={{ top: 50 }} onAppearanceChange={changeAppearance} />}
    </>
  );
}
